const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
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

app.get("/", (req, res) => {
  //
});

app.post("/", (req, res) => {
  const adminPass = req.body.adminPass;
  console.log(req);
  console.log(adminPass);
  if (adminPass != process.env.ADMIN_PASS) {
    return res.status(401).json({ Description: "Unauthorized" });
  }
  return res.status(200).json({ Description: "Authorized" });
});

app.get("/game", (req, res) => {
  startTimer();
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
