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

/*router.post("/emergency", (req, res) => {
    const { message } = req.body;
    const io = req.app.get("io");

    io.emit("Emergency", {
        message,
    });

    res.json({
        success: true,
        message: "Emergency sent & broadcasted",
    });
});*/
const Emergency = require("../models/Emergency");

router.post("/emergency", async (req, res) => {
  try {
    const { message,location } = req.body;

    // 1️⃣ Save to MongoDB
    const emergency = await Emergency.create({ message, location });

    // 2️⃣ Emit real-time event
    const io = req.app.get("io");
    io.emit("Emergency", emergency);

    res.json({
      success: true,
      data: emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Get all emergencies
router.get("/emergency", async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });
//{createdAt:-1}Latest emergency shows first,
//Very important for emergency systems
    res.json({
      success: true,
      data: emergencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Accept emergency
router.put("/emergency/:id/accept", async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    // Emit real-time update
    req.app.get("io").emit("EmergencyAccepted", emergency);

    res.json({
      success: true,
      data: emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//Reject Emergency
router.put("/emergency/:id/reject", async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    // Emit real-time update
    req.app.get("io").emit("EmergencyRejected", emergency);

    res.json({
      success: true,
      data: emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



module.exports = router;

//👉 Notice:

//REST API triggers Socket.io

//No direct socket logic in client anymore
