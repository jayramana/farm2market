require("dotenv").config();
const cors = require("cors")
const express = require("express")

const app = express();
const appRoutes = require("./routes/app.route.js");

app.use(cors())
app.use(express.json());
app.use("/api/f2m", appRoutes);


module.exports = app;