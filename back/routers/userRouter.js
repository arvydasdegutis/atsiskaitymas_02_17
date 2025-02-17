const express = require("express");
const { signup, login, logout, protect, getAuthenticatedUser } = require("../controllers/authController");
const validateNewUser = require("../validators/signup");
const validate = require("../validators/validate");
const validateLogin = require("../validators/login");

const userRouter = express.Router();


userRouter.route("/signup").post(validateNewUser, validate, signup);


userRouter.route("/login").post(validateLogin, validate, login);

userRouter.route("/me").get(protect, getAuthenticatedUser);
userRouter.route('/logout').get(protect, logout);

module.exports = userRouter;
