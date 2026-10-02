const express = require("express");
const { body } = require("express-validator");

const {
  getPrograms,
  getProgramBySlug,
  getAllProgramsAdmin,
  createProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

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

router.get("/", getPrograms);

/*
|--------------------------------------------------------------------------
| Admin - Get All Programs
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllProgramsAdmin
);

/*
|--------------------------------------------------------------------------
| Admin - Create Program
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  adminOnly,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 150 })
      .withMessage(
        "Title must be 150 characters or less"
      ),

    body("slug")
      .trim()
      .notEmpty()
      .withMessage("Slug is required")
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        "Slug may contain lowercase letters, numbers and hyphens only"
      ),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category is required"),

    body("technologies")
      .optional()
      .isArray()
      .withMessage(
        "Technologies must be an array"
      ),

    body("duration")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage(
        "Duration must be 100 characters or less"
      ),

    body("active")
      .optional()
      .isBoolean()
      .withMessage(
        "Active must be boolean"
      ),

    validate,
  ],
  createProgram
);

/*
|--------------------------------------------------------------------------
| Admin - Update Program
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  protect,
  adminOnly,
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage(
        "Title cannot be empty"
      )
      .isLength({ max: 150 })
      .withMessage(
        "Title must be 150 characters or less"
      ),

    body("slug")
      .optional()
      .trim()
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        "Slug may contain lowercase letters, numbers and hyphens only"
      ),

    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage(
        "Description cannot be empty"
      ),

    body("category")
      .optional()
      .trim()
      .notEmpty()
      .withMessage(
        "Category cannot be empty"
      ),

    body("technologies")
      .optional()
      .isArray()
      .withMessage(
        "Technologies must be an array"
      ),

    body("duration")
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage(
        "Duration must be 100 characters or less"
      ),

    body("active")
      .optional()
      .isBoolean()
      .withMessage(
        "Active must be boolean"
      ),

    validate,
  ],
  updateProgram
);

/*
|--------------------------------------------------------------------------
| Admin - Delete Program
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProgram
);

/*
|--------------------------------------------------------------------------
| Public - Get Program By Slug
|--------------------------------------------------------------------------
*/

router.get(
  "/:slug",
  getProgramBySlug
);

module.exports = router;