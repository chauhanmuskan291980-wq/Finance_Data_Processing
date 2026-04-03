const express = require("express");
const router = express.Router();

const recordController = require("../controller/record.controller");
const { authenticate, authorizeRoles } = require("../middleware/auth.middleware");
const { route } = require("./user.routers");
const validate = require("../middleware/validate.middleware");
const { recordValidation } = require("../validations/record.validation");


router.post("/",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    recordValidation,
    validate,
    recordController.createRecord
);

router.get(
    "/",
    authenticate,
    recordController.getRecordsBySearch
);

router.get(
    "/all",
    authenticate,
    authorizeRoles("ADMIN", "ANALYST"),
    recordController.getRecords
)

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
