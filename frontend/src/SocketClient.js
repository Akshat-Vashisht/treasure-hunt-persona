import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const TimerApp = () => {
  const [timer, setTimer] = useState("2:00");
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Get the socket ID once the connection is established
    socket.on("connect", () => {
      setSocketId(socket.id);

      // Get the initial timer value from the server
      axios.get(`http://localhost:5000/api/timer?socketId=${socket.id}`).then((response) => {
        setTimer(response.data.timer);

        // Emit an event to the server to start the timer
        socket.emit("startTimer");
      });
    });

    // Listen for timer updates from the server
    socket.on("timer", (timerValue) => {
      setTimer(timerValue);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Timer: {timer}</h1>
    </div>
  );
};

export default TimerApp;
