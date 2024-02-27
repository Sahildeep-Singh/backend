const mongoose = require("mongoose");

/* | ~ ~ ~ ~ ~ ~ ~ ~ CONFIG'S ~ ~ ~ ~ ~ ~ ~ | */
const {
  DB: { MONGO_URI },
} = require("../config/config");

const connect = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    // Get the default connection
    const db = mongoose.connection;

    // Check for successful connection
    db.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    // Check for error during connection
    db.on("error", (err) => {
      console.error("Error connecting to MongoDB:");
      console.error(err.message);
    });

    // Check for disconnection
    db.on("disconnected", () => {
      console.warn("Disconnected from MongoDB");
    });

    // Check if the Node.js process is terminated, and close the MongoDB connection
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.warn("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (err) {
    console.error("ERR==>>", err);
  }
};

module.exports = { connect };
