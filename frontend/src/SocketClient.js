import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const TimerApp = () => {
  const socket = io("http://localhost:5000");
  const [timer, setTimer] = useState(0);

  useEffect(() => {

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
