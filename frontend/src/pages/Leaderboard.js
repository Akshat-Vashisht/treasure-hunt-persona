import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const socket = io("https://treasure-hunt-mit.onrender.com", {
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
    <div className="text-white">
      <table className="w-full mt-5">
        <thead>
          <tr className="border divide-x divide-white border-white text-center">
            <td>Team Name</td>
            <td>Time</td>
            <td>Crates Opened</td>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((team) => {
            return (
              <tr className="border divide-x divide-white border-white text-center">
                <td>{team.teamName}</td>
                <td>{team.timeTaken}</td>
                <td>{team.crates}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
