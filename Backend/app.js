require("dotenv").config();
const express = require("express")

const app = express();
const appRoutes = require("./routes/app.route.js");

app.use(express.json());
app.use("/api/f2m", appRoutes);


module.exports = app;