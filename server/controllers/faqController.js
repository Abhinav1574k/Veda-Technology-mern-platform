const FAQ = require("../models/FAQ");

const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({
      active: true,
    }).sort({
      order: 1,
      createdAt: 1,
    });

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFAQsAdmin = async (
  req,
  res,
  next
) => {
  try {
    const faqs = await FAQ.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

const createFAQ = async (req, res, next) => {
  try {
    const {
      question,
      answer,
      order,
      active,
    } = req.body;

    if (!question || !answer) {
      res.status(400);
      throw new Error(
        "Question and answer are required"
      );
    }

    const faq = await FAQ.create({
      question,
      answer,
      order,
      active,
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(
      req.params.id
    );

    if (!faq) {
      res.status(404);
      throw new Error("FAQ not found");
    }

    Object.assign(faq, req.body);

    const updatedFAQ = await faq.save();

    res.json({
      success: true,
      message: "FAQ updated successfully",
      data: updatedFAQ,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(
      req.params.id
    );

    if (!faq) {
      res.status(404);
      throw new Error("FAQ not found");
    }

    await faq.deleteOne();

    res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFAQs,
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};