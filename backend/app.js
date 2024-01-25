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

let timerValue = 120; // Set the initial timer value to 2 minutes (2 * 60 seconds)
let timerInterval;

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the initial timer value to the newly connected client
  io.to(socket.id).emit("timer", formatTimer(timerValue));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("startTimer", () => {
    console.log("Starting timer...");

    // Clear the existing timer interval before starting a new one
    clearInterval(timerInterval);
    startTimer();
  });
});

// Start the timer on the server
function startTimer() {
  timerInterval = setInterval(() => {
    if (timerValue > 0) {
      timerValue--;
    }
    const formattedTimer = formatTimer(timerValue);

    console.log(formattedTimer);
    io.emit("timer", formattedTimer);

    if (timerValue === 0) {
      clearInterval(timerInterval);
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

// API endpoint to get the current timer value
app.get("/api/timer", (req, res) => {
  res.json({ timer: formatTimer(timerValue) });
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
