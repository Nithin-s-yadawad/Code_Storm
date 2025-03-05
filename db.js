// Import the Mongoose library
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database at the specified URL
    await mongoose.connect('mongodb://localhost:27017/grocery', {
      useNewUrlParser: true,       // Use the new URL parser
      useUnifiedTopology: true,    // Use the new server discovery and monitoring engine
    });
    // Log a message to the console if the connection is successful
    console.log('MongoDB connected...');
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error(err.message);
    // Exit the process with a failure code if the connection fails
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;
