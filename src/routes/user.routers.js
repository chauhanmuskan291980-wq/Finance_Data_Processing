const express = require("express");
const router = express.Router();

const userController= require("../controller/user.controller");

const {
  authenticate,
  authorizeRoles,
} = require("../middleware/auth.middleware");

router.get("/",authenticate,authorizeRoles,userController.getAlluser);
router.patch(":/id" , authenticate , authorizeRoles("ADMIN") , userController.updateUser);
router.get("/me", authenticate , userController.getMe);

module.exports = router;


 