const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validateMiddleware = require("../middleware/validate");
const { regValidate, logValidate } = require("../validators/userValidator");
const {loginLimiter, registerLimiter}  = require('../middleware/rateLimiter')

const router = express.Router();

// register route
router.post(
  "/register",
  registerLimiter,
  validateMiddleware(regValidate),
  userController.registerUser
);

//login route
router.post(
  "/login",
  loginLimiter,
  validateMiddleware(logValidate),
  userController.loginUser
);

// User info
router.get("/me", auth, userController.me);

module.exports = router;
