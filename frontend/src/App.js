import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./pages/Protected";
import SocketClient from "./SocketClient";
import Register from "./pages/Register";
import GameQues from "./pages/GameQues";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/game" element={<SocketClient />} />
        <Route path="/game-ques" element={<GameQues />} />
      </Routes>
    </Router>
  );
}

export default App;
