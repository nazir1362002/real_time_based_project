/*router.post("/emergency", (req, res) => {
    const { message } = req.body;
    
    res.json({
        success: true,
        message: "Emergency received",
        data: message,
        });
        });*/

const express = require("express");
const router = express.Router();

router.post("/emergency", (req, res) => {
    const { message } = req.body;
    const io = req.app.get("io");

    io.emit("Emergency", {
        message,
    });

    res.json({
        success: true,
        message: "Emergency sent & broadcasted",
    });
});
module.exports = router;

//👉 Notice:

//REST API triggers Socket.io

//No direct socket logic in client anymore
