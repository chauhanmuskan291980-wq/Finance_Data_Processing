const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const userRoutes = require("./routes/user.routers");
const  recordRouter = require("./routes/record.routes");
const  dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});

app.use(limiter);
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/users", userRoutes);
app.use("/records", recordRouter);
app.use("/dashboard", dashboardRoutes);


module.exports = app;