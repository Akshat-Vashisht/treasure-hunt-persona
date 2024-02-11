import React, { useEffect, useState } from "react";
import { GiChest, GiHourglass } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";

const Endgame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeTaken, setTimeTaken] = useState("-");
  let cratesOpened, timer, teamName;

  if (location.state) {
    const {
      cratesOpened: opened,
      timer: time,
      teamName: name,
    } = location.state;
    cratesOpened = opened;
    timer = time;
    teamName = name;
  }

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    } else {
      let strArr = timer?.split(":");
      let numArr = strArr?.map((item) => +item);
      let timeLeft = numArr[1] + 60 * numArr[0];
      setTimeTaken(3600 - timeLeft);
      console.log(timeTaken);
    }
  }, [location]);

  return (
    <div className="grid grid-cols-6 gap-x-16 h-screen overflow-hidden items-center px-8 bg-[#02141E]">
      <div className=" flex flex-col col-span-2 ">
        <img src="./assets/register-bg.png" alt="Treasure hunt logo" />
        <img
          className="-mt-10"
          src="./assets/treasurehunt-txt.svg"
          alt="Treasure hunt text"
        />
      </div>
      <div className=" text-white w-full col-span-4">
        <h1 className="text-4xl font-semibold">Game Ended!</h1>
        <p className="my-3">
          Congratulations, <span className="font-semibold">{teamName}</span>!
        </p>
        <p className="my-3">You've conquered the treasure hunt!</p>
        <ul className="w-fit  my-8 space-y-2  ">
          <li className="flex gap-1 items-center">
            {" "}
            <GiHourglass className="text-xl" /> Total Time : {timeTaken}
          </li>
          <li className="flex gap-1 items-center">
            <GiChest className="text-xl" /> Total Crates : {cratesOpened}
          </li>
          <li></li>
        </ul>
      </div>
      <div className="flex justify-between w-full left-0 fixed bottom-4 px-5">
        <img
          className="w-[7rem]"
          src="./assets/mitadt-logo.png"
          alt="MITADT logo"
        />
        <img className="w-[7rem]" src="./assets/persona-logo.png" alt="" />
      </div>
    </div>
  );
};

export default Endgame;
