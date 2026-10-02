const express = require("express");
const { body } = require("express-validator");

const {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

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

router.get("/", getServices);

/*
|--------------------------------------------------------------------------
| Admin - Get All Services
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllServicesAdmin
);

/*
|--------------------------------------------------------------------------
| Admin - Create Service
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

    body("featured")
      .optional()
      .isBoolean()
      .withMessage(
        "Featured must be boolean"
      ),

    body("active")
      .optional()
      .isBoolean()
      .withMessage(
        "Active must be boolean"
      ),

    validate,
  ],
  createService
);

/*
|--------------------------------------------------------------------------
| Admin - Update Service
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

    body("featured")
      .optional()
      .isBoolean()
      .withMessage(
        "Featured must be boolean"
      ),

    body("active")
      .optional()
      .isBoolean()
      .withMessage(
        "Active must be boolean"
      ),

    validate,
  ],
  updateService
);

/*
|--------------------------------------------------------------------------
| Admin - Delete Service
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteService
);

/*
|--------------------------------------------------------------------------
| Public - Get Service By Slug
|--------------------------------------------------------------------------
*/

router.get(
  "/:slug",
  getServiceBySlug
);

module.exports = router;