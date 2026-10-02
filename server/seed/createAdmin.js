require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL
      .toLowerCase()
      .trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Admin user already exists.");
      await mongoose.connection.close();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    await User.create({
      name: process.env.ADMIN_NAME,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin user created successfully.");
    console.log(`Admin email: ${email}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(
      "Admin creation failed:",
      error.message
    );

    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();