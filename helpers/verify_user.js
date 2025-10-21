import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://growthdev1:Ji0LlqjCuFzlYP9s@cluster0.zgxt7d9.mongodb.net/fakeminingapp?retryWrites=true&w=majority";

const verifyUserEmail = async (email) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return;
    }

    console.log("📄 User record found:\n", user);

    // Update emailVerified to true
    if (!user.emailVerified) {
      user.emailVerified = true;
      await user.save();
      console.log(`Email verified flag set to true for ${email}`);
    } else {
      console.log(`Email already verified for ${email}`);
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
    process.exit(0);
  }
};

verifyUserEmail("hieutran421999@gmail.com");
