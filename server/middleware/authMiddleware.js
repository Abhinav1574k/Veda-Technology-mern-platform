const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authentication required");
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      res.status(401);
      throw new Error("User no longer exists");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401);
      return next(new Error("Invalid authentication token"));
    }

    if (error.name === "TokenExpiredError") {
      res.status(401);
      return next(new Error("Authentication token expired"));
    }

    next(error);
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403);
    return next(
      new Error("Administrator access required")
    );
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};