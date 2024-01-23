import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const TimerApp = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:5000");

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
      <h1>Timer: {timer} seconds</h1>
    </div>
  );
};

export default TimerApp;
