const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());


//app.use(express.json());

const emergencyRoutes = require("./routes/emergency.routes");
app.use("/api", emergencyRoutes);

module.exports = app;
