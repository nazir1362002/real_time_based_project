require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server,
  {
    cors: {
      origin: "*", // allow all origins for testing
    },
  });

app.set("io", io);//This allows routes to access socket using req.app.get("io")

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("Emergency", (data) => {
    console.log("Emergency received 🚑", data);
    io.emit("Emergency", data); // broadcast to all clients
  });
  //Receivce location on Server
  socket.on("responderLocation", (location) => {
    socket.broadcast.emit("responderLocation", location);
    //Socket.broadcast sends data to all except sender.
  });


  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const connectDB = require("./config/db");
connectDB();


server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
