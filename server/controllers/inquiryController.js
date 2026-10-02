const Inquiry = require("../models/Inquiry");

const createInquiry = async (req, res, next) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

const getInquiries = async (
  req,
  res,
  next
) => {
  try {
    const inquiries = await Inquiry.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "NEW",
      "IN_PROGRESS",
      "RESOLVED",
      "ARCHIVED",
    ];

    if (!allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid inquiry status");
    }

    const inquiry = await Inquiry.findById(
      req.params.id
    );

    if (!inquiry) {
      res.status(404);
      throw new Error("Inquiry not found");
    }

    inquiry.status = status;

    const updatedInquiry =
      await inquiry.save();

    res.json({
      success: true,
      message: "Inquiry status updated",
      data: updatedInquiry,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (
  req,
  res,
  next
) => {
  try {
    const inquiry = await Inquiry.findById(
      req.params.id
    );

    if (!inquiry) {
      res.status(404);
      throw new Error("Inquiry not found");
    }

    await inquiry.deleteOne();

    res.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
};