import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./pages/Protected";
// import SocketClient from "./SocketClient";
import GameView from "./pages/GameView";
import Register from "./pages/Register";
import GameQues from "./pages/GameQues";
import { useState } from "react";
import Leaderboard from "./pages/Leaderboard";
import Endgame from "./pages/Endgame";

function App() {
  const [teamName, setTeamName] = useState("")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register teamName={teamName} setTeamName={setTeamName}/>} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/game" element={<GameView teamName={teamName} />} />
        <Route path="/endgame" element={<Endgame teamName={teamName} />} />
        <Route path="/admin/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
