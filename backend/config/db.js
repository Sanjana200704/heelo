const mongoose = require("mongoose");
require("dotenv").config();

// Log the MongoDB URI only if in development mode (to avoid exposing sensitive information in production)
if (process.env.NODE_ENV !== "production") {
  console.log("MongoDB URI:", process.env.MONGOOSE_URI);
}

const connectDB = async () => {
  try {
    // Establish a connection to MongoDB with recommended options
    await mongoose.connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);

    // Graceful shutdown in case of failure
    process.exit(1);
  }
};

// Event listeners for better monitoring
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB.");
});

mongoose.connection.on("error", (error) => {
  console.error("Mongoose connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected.");
});

// Graceful shutdown handler
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination.");
  process.exit(0);
});

module.exports = connectDB;
