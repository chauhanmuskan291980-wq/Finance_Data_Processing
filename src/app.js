const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const userRoutes = require("./routes/user.routers");

const app = express();
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/users", userRoutes);



module.exports = app;