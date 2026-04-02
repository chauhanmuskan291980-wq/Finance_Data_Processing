const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


const app = express();
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;