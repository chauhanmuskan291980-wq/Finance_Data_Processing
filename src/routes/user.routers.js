const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const validate = require("../middleware/validate.middleware");

const {
  registerValidation,
  loginValidation,
} = require("../validations/user.validation");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/auth.middleware");


router.post("/register",
  registerValidation,
  validate,
  userController.register
)
router.post("/login",
  registerValidation,
  validate,
  userController.login
)
//  Get all users (Admin)
router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  userController.getAlluser
);

//  Update user
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  userController.updateUser
);

//  Get current user
router.get("/me", authenticate, userController.getMe);

module.exports = router;