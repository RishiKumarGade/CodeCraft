const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
  socket.join(data.room);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
  })

  socket.on("edit_content", (data) => {
    socket.to(data.room).emit("edit_content_response", data);
  });

  socket.on("create_file",(data)=>{
    socket.to(data.room).emit("create_file_response",data);
  })
  socket.on("delete_file",(data)=>{
    socket.to(data.room).emit("delete_file_response",data);
  })
  socket.on("update_change",(data)=>{
    socket.to(data.room).emit("retrive_change",data);
  })
  socket.on("action",(data)=>{
    socket.to(data.room).emit("action_response",data);
  })
  socket.on("message",(data)=>{
    socket.to(data.room).emit("message_response",data);
  })


});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});


