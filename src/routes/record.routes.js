const express = require("express");
const router = express.Router();

const recordController = require("../controller/record.controller");
const { authenticate, authorizeRoles } = require("../middleware/auth.middleware");
const { route } = require("./user.routers");

router.post("/",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    recordController.createRecord
);

router.get(
    "/",
    authenticate,
    recordController.getRecords
);

router.patch(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    recordController.updatedRecord
);

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    recordController.deleteRecord
);

module.exports = router;
