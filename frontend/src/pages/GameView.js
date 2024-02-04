import React, { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { io } from "socket.io-client";
import axios from "axios";
import GameQues from "./GameQues";
import { useNavigate } from "react-router-dom";

const GameView = ({ teamName }) => {
  const navigate = useNavigate()
  const [timer, setTimer] = useState("02:00");
  const [socketId, setSocketId] = useState(null);
  const [chestOpened, setChestOpened] = useState([]);

  
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
    console.log("**Game end data sent");
    const cratesOpened = chestOpened.filter(item=>item.isOpen).length
    const res = await axios.post('/endgame',{
      timer : timer,
      crates : cratesOpened,
      teamName : teamName 
    })
   if(res.status===200){
    navigate('/endgame', {replace:true});
   }
  }
  async function updateScore(){
    const cratesOpened = chestOpened.filter(item=>item.isOpen).length
    const res = await axios.post('/endgame',{
      timer : timer,
      crates : cratesOpened,
      teamName : teamName 
    })
    if(res.status===200){
      console.log(res)
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

  //Timer stopped?
  useEffect(() => {
    if (checkTimerStop()) {
      gameEnd();
    }
  }, [timer]);

  //All crates opened?
  useEffect(()=>{
    if(chestOpened.filter(item=>item.isOpen).length === 8){
      gameEnd();
    }else{
      updateScore();
    }
  },[chestOpened])

  //User disconnected?
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      gameEnd();
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  return (
    <div className="">
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
        <GameQues chestOpened={chestOpened} setChestOpened={setChestOpened} />
      </div>
    </div>
  );
};

export default GameView;
