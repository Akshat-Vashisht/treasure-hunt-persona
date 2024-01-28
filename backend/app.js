const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
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

// Store user-specific timers
const userTimers = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  // Initialize user-specific timer
  userTimers[socket.id] = {
    value: 120, // Initial timer value in seconds
    interval: null, // Timer interval reference
  };

  // Send the initial timer value to the newly connected client
  io.to(socket.id).emit("timer", formatTimer(userTimers[socket.id].value));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    // Clear the user-specific timer interval on disconnection
    clearInterval(userTimers[socket.id].interval);
    delete userTimers[socket.id];
  });

  socket.on("startTimer", () => {
    console.log("Starting timer...");

    // Clear the existing user-specific timer interval before starting a new one
    clearInterval(userTimers[socket.id].interval);

    // Start the user-specific timer
    startUserTimer(socket.id);
  });
});

// Start the user-specific timer on the server
function startUserTimer(socketId) {
  userTimers[socketId].interval = setInterval(() => {
    if (userTimers[socketId].value > 0) {
      userTimers[socketId].value--;
    }
    const formattedTimer = formatTimer(userTimers[socketId].value);

    console.log(formattedTimer);
    io.to(socketId).emit("timer", formattedTimer);

    if (userTimers[socketId].value === 0) {
      clearInterval(userTimers[socketId].interval);
      console.log("Timer stopped");
    }
  }, 1000);
}

// Format the timer value to "mm:ss"
function formatTimer(timerValue) {
  const minutes = String(Math.floor(timerValue / 60)).padStart(2, "0");
  const seconds = String(timerValue % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// API endpoint to get the current user-specific timer value
app.get("/api/timer", (req, res) => {
  const socketId = req.query.socketId;
  // console.log(userTimers);
  // console.log(socketId);
  if (userTimers[socketId]) {
    res.json({ timer: formatTimer(userTimers[socketId].value) });
  } else {
    res.status(404).json({ error: "Timer not found for the specified user" });
  }
});

app.post("/", (req, res) => {
  const adminPass = req.body.adminPass;
  if (adminPass != process.env.ADMIN_PASS) {
    return res.status(401).json({ Description: "Unauthorized" });
  }
  return res.status(200).json({ Description: "Authorized" });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
