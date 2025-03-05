require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("📦 MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Notification Schema
const NotificationSchema = new mongoose.Schema({
  message: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
});
const Notification = mongoose.model("Notification", NotificationSchema);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Twilio Client
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Create HTTP server & WebSocket
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("🔌 WebSocket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ WebSocket Disconnected:", socket.id);
  });
});

// ✅ Route to Send Email Notification
app.post("/api/notify/email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    const notification = new Notification({ message: `Email sent to ${to}`, type: "email" });
    await notification.save();

    io.emit("new-notification", { message: `Email sent to ${to}`, type: "email" });

    res.json({ success: true, message: `Email sent to ${to}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Route to Send SMS Notification
app.post("/api/notify/sms", async (req, res) => {
  const { to, message } = req.body;

  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to,
    });

    const notification = new Notification({ message: `SMS sent to ${to}`, type: "sms" });
    await notification.save();

    io.emit("new-notification", { message: `SMS sent to ${to}`, type: "sms" });

    res.json({ success: true, message: `SMS sent to ${to}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Route to Fetch All Notifications
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Notification System running on http://localhost:${PORT}`);
});
