const express = require("express");
const cors = require("cors");
const http = require("http");
const { connectMongoDB } = require("./databse");
require("dotenv").config();

connectMongoDB()
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.MY_PORT || 6000;

const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});