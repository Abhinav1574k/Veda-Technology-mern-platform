const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inquiry", inquirySchema);