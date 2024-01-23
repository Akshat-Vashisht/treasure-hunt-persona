const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  },
});

let timerValue = 0;
let timerInterval;

app.get("/", (req, res) => {
  res.send("Hello from Socket.IO server");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the initial timer value to the newly connected client
  io.to(socket.id).emit("timer", timerValue);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the timer on the server
function startTimer() {
  timerInterval = setInterval(() => {
    timerValue++;
    // Emit the updated timer value to all connected clients
    console.log(timerValue);
    io.emit("timer", timerValue);
  }, 1000);
}

// Start the timer when the server is started
startTimer();

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
