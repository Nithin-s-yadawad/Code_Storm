module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);
        socket.emit("message", "Connected to WebSocket Server!");

        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
        });
    });
};
