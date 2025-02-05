const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes/index");
const reportRouter = require("./routes/reportRoutes");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("The backend is responding well!!");
});

app.use(process.env.APP_USER_ROUTE, Router);
app.use(process.env.APP_REPORT_ROUTE, reportRouter);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.error("Connection error:", err));
