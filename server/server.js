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

app.set("io" , io);//This allows routes to access socket using req.app.get("io")

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("Emergency", (data) => {
    console.log("Emergency received 🚑", data);
    io.emit("Emergency", data); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
