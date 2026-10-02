const express = require("express");
const { body } = require("express-validator");

const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
| Create a new contact inquiry
*/

router.post(
  "/",

  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 100 })
      .withMessage("Name must be 100 characters or less"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("A valid email is required")
      .normalizeEmail(),

    body("subject")
      .trim()
      .notEmpty()
      .withMessage("Subject is required")
      .isLength({ max: 200 })
      .withMessage("Subject must be 200 characters or less"),

    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ max: 5000 })
      .withMessage("Message must be 5000 characters or less"),

    validate,
  ],

  createInquiry
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
| Get all inquiries
*/

router.get(
  "/",
  protect,
  adminOnly,
  getInquiries
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
| Update inquiry status
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateInquiryStatus
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
| Delete inquiry
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteInquiry
);

module.exports = router;