const { body } = require("express-validator");
const { getUserByEmail } = require("../models/userModel");

const validateNewUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a valid string"),


  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (email) => {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error("Email is already in use. Please log in.");
      }
    }),


  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character")
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("passwordconfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),
];

module.exports = validateNewUser;
