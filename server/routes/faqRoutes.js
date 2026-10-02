const express = require("express");
const { body } = require("express-validator");

const {
  getFAQs,
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getFAQs);

/*
|--------------------------------------------------------------------------
| Admin - Get All FAQs
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllFAQsAdmin
);

/*
|--------------------------------------------------------------------------
| Admin - Create FAQ
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  adminOnly,
  [
    body("question")
      .trim()
      .notEmpty()
      .withMessage(
        "Question is required"
      )
      .isLength({ max: 300 })
      .withMessage(
        "Question must be 300 characters or less"
      ),

    body("answer")
      .trim()
      .notEmpty()
      .withMessage(
        "Answer is required"
      )
      .isLength({ max: 5000 })
      .withMessage(
        "Answer must be 5000 characters or less"
      ),

    body("order")
      .optional()
      .isInt({ min: 0 })
      .withMessage(
        "Order must be a non-negative integer"
      ),

    body("active")
      .optional()
      .isBoolean()
      .withMessage(
        "Active must be boolean"
      ),

    validate,
  ],
  createFAQ
);

/*
|--------------------------------------------------------------------------
| Admin - Update FAQ
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  protect,
  adminOnly,
  [
    body("question")
      .optional()
      .trim()
      .notEmpty()
      .withMessage(
        "Question cannot be empty"
      )
      .isLength({ max: 300 })
      .withMessage(
        "Question must be 300 characters or less"
      ),

    body("answer")
      .optional()
      .trim()
      .notEmpty()
      .withMessage(
        "Answer cannot be empty"
      )
      .isLength({ max: 5000 })
      .withMessage(
        "Answer must be 5000 characters or less"
      ),

    body("order")
      .optional()
      .isInt({ min: 0 })
      .withMessage(
        "Order must be a non-negative integer"
      ),

    body("active")
      .optional()
      .isBoolean()
      .withMessage(
        "Active must be boolean"
      ),

    validate,
  ],
  updateFAQ
);

/*
|--------------------------------------------------------------------------
| Admin - Delete FAQ
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteFAQ
);

module.exports = router;