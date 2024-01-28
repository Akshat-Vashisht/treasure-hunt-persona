import React, { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { io } from "socket.io-client";
import axios from "axios";
import GameQues from "./GameQues";

const GameView = () => {
  const [timer, setTimer] = useState("02:00");
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Get the socket ID once the connection is established
    socket.on("connect", () => {
      setSocketId(socket.id);

      // Get the initial timer value from the server
      axios
        .get(`http://localhost:5000/timer?socketId=${socket.id}`)
        .then((response) => {
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
  function checkTimerStop() {
    let strArr = timer.split(":");
    let numArr = strArr.map((item) => +item);
    // console.log(numArr);
    // console.log(numArr.every((item) => item == 0));
    return numArr.every((item) => item == 0);
  }
  useEffect(() => {
    checkTimerStop();
  }, [timer]);
  return (
    <div  className="">
      {" "}
      <div
        style={{
          background: "url(./assets/game-bg.png)",
          backgroundSize: "cover",
        }}
        className="h-[30vh] w-full absolute top-0 z-10 "
      >
        <span className=" bg-[#151F21] h-[6rem] blur-lg opacity-40 -bottom-10 w-full absolute"></span>
      </div>

        <h1 className="absolute z-50 bg-black text-white right-0 top-4 p-2 min-w-[9rem] rounded-s-md flex items-center gap-x-1">
          <MdOutlineTimer />
          Timer: {timer}
        </h1>
        <div className="mt-[10rem]">
          <GameQues />
        </div>
    </div>
  );
};

export default GameView;
