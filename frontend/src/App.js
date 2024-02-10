import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./pages/Protected";
// import SocketClient from "./SocketClient";
import GameView from "./pages/GameView";
import Register from "./pages/Register";
import GameQues from "./pages/GameQues";
import { useEffect, useState } from "react";
import Leaderboard from "./pages/Leaderboard";
import Endgame from "./pages/Endgame";

function App() {
  const [teamName, setTeamName] = useState("");

  // disable context menu
  useEffect(() => {
    const disableContextMenu = (event) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  //ensure fullscreen
  useEffect(() => {
    const requestFullScreen = () => {
      document.documentElement.requestFullscreen();
    };
    document.addEventListener("click", requestFullScreen);
    return () => {
      document.removeEventListener("click", requestFullScreen);
    };
  }, []);

  //disable webtools
  useEffect(() => {
    const disableDevTools = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
          (e.keyCode === 123)) { // F12
        e.preventDefault();
      }
    };

    // Listen for keydown events at the document level
    document.addEventListener('keydown', disableDevTools);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', disableDevTools);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Register teamName={teamName} setTeamName={setTeamName} />}
        />
        <Route path="/protected" element={<Protected />} />
        <Route path="/game" element={<GameView teamName={teamName} />} />
        <Route path="/endgame" element={<Endgame teamName={teamName} />} />
        <Route path="/admin/leaderboard" element={<Leaderboard />} />
        <Route
          path="*"
          element={
            <div className="text-center text-white">404 Page not found</div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
