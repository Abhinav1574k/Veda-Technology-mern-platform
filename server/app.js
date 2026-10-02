const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const serviceRoutes = require("./routes/serviceRoutes");
const programRoutes = require("./routes/programRoutes");
const faqRoutes = require("./routes/faqRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

app.set("trust proxy", 1);

/*
|--------------------------------------------------------------------------
| Security Headers
|--------------------------------------------------------------------------
*/

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS policy does not allow this origin")
      );
    },

    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

/*
|--------------------------------------------------------------------------
| API Rate Limiting
|--------------------------------------------------------------------------
*/

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

/*
|--------------------------------------------------------------------------
| Root Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Veda Technology API is running",
  });
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/programs", programRoutes);

app.use("/api/faqs", faqRoutes);

app.use("/api/inquiries", inquiryRoutes);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

app.use(notFound);

app.use(errorHandler);

module.exports = app;