import React, { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { io } from "socket.io-client";
import axios from "axios";
import GameQues from "./GameQues";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../axiosConfig";

const GameView = ({ teamName }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState("02:00");
  const [socketId, setSocketId] = useState(null);
  const [chestOpened, setChestOpened] = useState([]);
  const [confirmUnload, setConfirmUnload] = useState(false);

  function checkTimerStop() {
    let strArr = timer.split(":");
    let numArr = strArr.map((item) => +item);
    return numArr.every((item) => item == 0);
  }

  async function gameEnd() {
    /*
      case 3 : user leave the site
      case 2 : time stop
      case 1 : all crates open
      */
    const cratesOpened = chestOpened.filter((item) => item.isOpen).length;
    const res = await axiosConfig.post("/endgame", {
      timer: timer,
      crates: cratesOpened,
      teamName: teamName,
    });
    if (res.status === 200) {
      navigate("/endgame", {
        replace: true,
        state: {
          cratesOpened: cratesOpened,
          timer: timer,
          teamName: teamName,
        },
      });
    }
  }

  async function updateScore() {
    const cratesOpened = chestOpened.filter((item) => item.isOpen).length;
    const res = await axiosConfig.post("/endgame", {
      timer: timer,
      crates: cratesOpened,
      teamName: teamName,
    });
    if (res.status === 200) {
      // navigate('/endgame', {replace:true});
    }
  }
  //Socket Io
  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Get the socket ID once the connection is established
    socket.on("connect", () => {
      setSocketId(socket.id);

      // Get the initial timer value from the server
      axiosConfig
        .get(
          `/timer?socketId=${socket.id}`
        )
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

  // Timer stopped?
  useEffect(() => {
    if (checkTimerStop()) {
      gameEnd();
    }
  }, [timer]);

  //All crates opened?
  useEffect(() => {
    if (chestOpened.filter((item) => item.isOpen).length === 8) {
      gameEnd();
    }
  }, [chestOpened]);

  //All crates opened?
  useEffect(() => {
    if (chestOpened.filter((item) => item.isOpen).length === 8) {
      gameEnd();
    } else {
      updateScore();
    }
  }, [chestOpened]);

  useEffect(() => {
    if (!teamName) {
      navigate("/", { replace: true });
    }
  }, [teamName]);

  // User disconnected?
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      updateScore();
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timer, chestOpened, teamName]);

  return (
    <>
      <div className="absolute flex flex-col justify-center items-center w-[8rem] top-0 left-2">
        <img src="./assets/register-bg.png" alt="Treasure hunt logo" />
        <img
          className="-mt-10"
          src="./assets/treasurehunt-txt.svg"
          alt="Treasure hunt text"
        />
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="absolute z-50 bg-black text-white right-0 top-4 p-2 min-w-[9rem] rounded-s-md flex items-center gap-x-1">
          <MdOutlineTimer />
          Timer: {timer}
        </h1>
        <div className="w-full mt-12">
          <p className="text-white text-lg font-semibold text-center">
            Crates Opened : {chestOpened.filter((item) => item.isOpen).length}/8
          </p>
          <GameQues
            timer={timer}
            updateScore={updateScore}
            chestOpened={chestOpened}
            setChestOpened={setChestOpened}
          />
        </div>
      </div>
    </>
  );
};

export default GameView;
