const { body } = require("express-validator");
const argon2 = require("argon2");
const { getUserByEmail } = require("../models/userModel");

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const existingUser = await getUserByEmail(req.body.email);

      if (!existingUser) {
        console.log("User not found:", req.body.email); 
        throw new Error("User not found, please sign up");
      }

      console.log("Checking password for:", existingUser.email); 
      const match = await argon2.verify(existingUser.password, value);

      if (!match) {
        console.log("Incorrect password for:", existingUser.email); 
        throw new Error("Incorrect password");
      }

      return true;
    }),
];

module.exports = validateLogin;
