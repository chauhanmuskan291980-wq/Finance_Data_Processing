const { body } = require("express-validator");

exports.recordValidation = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("type")
    .isIn(["INCOME", "EXPENSE"])
    .withMessage("Type must be INCOME or EXPENSE"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("date")
    .isISO8601()
    .withMessage("Date must be valid ISO format"),

  body("notes")
    .optional()
    .isString()
];