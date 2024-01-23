import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./pages/Protected";
import SocketClient from "./SocketClient";
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
      <SocketClient/>
    </Router>
  );
}

export default App;
