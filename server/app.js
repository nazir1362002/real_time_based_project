const express = require("express");
const cors = require('cors');
const app = express();




app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: true }));


//app.use(express.json());

const emergencyRoutes = require("./routes/emergency.routes");
app.use("/api", emergencyRoutes);
//Connect Routes to app
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


module.exports = app;
