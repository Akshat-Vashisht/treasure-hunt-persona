import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const TimerApp = () => {
  const [timer, setTimer] = useState("2:00");

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Get the initial timer value from the server
    axios.get("http://localhost:5000/api/timer").then((response) => {
      setTimer(response.data.timer);
    });

    // Listen for timer updates from the server
    socket.on("timer", (timerValue) => {
      setTimer(timerValue);
    });

    // Emit an event to the server to start the timer
    socket.emit("startTimer");

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
