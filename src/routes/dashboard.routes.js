const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/dashboard.controller");
const { authenticate, authorizeRoles } = require("../middleware/auth.middleware");

// Summary
router.get(
  "/summary",
  authenticate,
  authorizeRoles("ADMIN", "ANALYST"),
  dashboardController.getSummary
);

// Category
router.get(
  "/categories",
  authenticate,
  authorizeRoles("ADMIN", "ANALYST"),
  dashboardController.getCategoryTotals
);

// Recent
router.get(
  "/recent",
  authenticate,
  authorizeRoles("ADMIN", "ANALYST"),
  dashboardController.getRecentRecords
);

// Trends
router.get(
  "/trends",
  authenticate,
  authorizeRoles("ADMIN", "ANALYST"),
  dashboardController.getMonthlyTrends
);

module.exports = router;