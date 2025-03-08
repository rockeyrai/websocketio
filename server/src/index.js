const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());

const PORT = 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: Handle a message from the client
  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    // Send a message back to the client
    socket.emit("receive_message", { text: "Message received successfully!" });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
