import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { LuCrown } from "react-icons/lu";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const socket = io("https://treasure-hunt-persona-api.vercel.app/", {
      auth: {
        role: "admin",
      },
    });

    socket.on("leaderboardUpdate", (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  console.log(leaderboard);
  return (
    <div className="text-white px-10">
      <h1 className="text-3xl my-8 flex items-center justify-center gap-2">
        Leaderboard{" "}
        <LuCrown
        />{" "}
      </h1>
      {/* <div className="grid grid-cols-4 gap-x-2"> */}
        {/* <div className="h-[50vh] bg-green-400 col-span-1 rounded-lg"></div> */}
        <table className="w-full h-fit col-span-3 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-400 text-center ">
              <td className="py-2">Rank</td>
              <td className="py-2">Team Name</td>
              <td className="py-2">Crates Opened</td>
              <td className="py-2">Time</td>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => {
              return (
                <tr className="bg-gray-100 text-slate-600 text-center">
                  <td className="py-2 border-b border-slate-300">{index + 1}</td>
                  <td className="py-2 border-b border-slate-300">{team.teamName}</td>
                  <td className="py-2 border-b border-slate-300">{team.crates}</td>
                  <td className="py-2 border-b border-slate-300">{team.timeTaken}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      {/* </div> */}
    </div>
  );
};

export default Leaderboard;
