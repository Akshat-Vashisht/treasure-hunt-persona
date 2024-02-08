import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import PasswordInput from "../Components/PasswordInput";

const Register = ({ teamName, setTeamName }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    teamName: "",
    adminPass: "",
  });
  const [password, setPassword] = useState(Array(6).fill(""));
  const [pageState, setPageState] = useState(0);
  const inputRefs = useRef([]);

  function checkFields() {
    return Object.values(data).every((item) => item.length > 0);
  }
  async function register() {
    const { teamName, adminPass } = data;
    const newState = {
      teamName: teamName.trim(),
      adminPass: adminPass,
    };

    console.log(newState);
    if (checkFields()) {
      try {
        const res = await axios.post("http://15.206.164.121:5000/", newState);
        console.log(res);
        if (res.status === 200) {
          setTeamName(teamName);
          navigate("/game");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handlePasswordChange = (index, value) => {
    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    setData({
      ...data,
      adminPass: newPassword.join(""),
    });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="bg-[#02141E] h-screen flex flex-col items-center justify-center">
      <div className=" flex flex-col w-[70vw]">
        <img src="./assets/treasurehunt-txt.svg" alt="Treasure hunt text" />
        <img src="./assets/register-bg.png" alt="Treasure hunt logo" />
      </div>
      {/* Body */}
      {pageState === 0 && (
        <button
          onClick={() => setPageState(1)}
          className="z-10 bg-[#000306] flex items-center px-2 py-1 font-semibold rounded-md gap-x-2 text-white"
        >
          Register{" "}
          <FaArrowRight className="bg-white text-[#000306] p-1 text-xl rounded-full" />
        </button>
      )}
      {pageState === 1 && (
        <>
          <div
            onClick={() => setPageState(0)}
            className="h-screen absolute bg-[#00030636] top-0 left-0 w-full"
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#000306] space-y-5 w-[80vw]  px-3 py-5 rounded-lg">
            <RxCross1
              onClick={() => setPageState(0)}
              className="text-white absolute right-2 top-2"
            />
            <label className="text-[#3CC4ED] text-sm font-semibold">
              Team Name
            </label>
            <input
              placeholder="Enter Team name"
              className="w-full bg-transparent text-slate-100 border rounded-md p-2"
              type="text"
              name="teamName"
              value={data.teamName}
              onChange={handleChange}
              id="teamName"
            />
            <button
              onClick={() => {
                data.teamName.trim().length >= 3
                  ? setPageState(2)
                  : setPageState(1);
              }}
              className="mx-auto flex items-center gap-x-2 font-semibold text-white"
            >
              Submit
              <FaArrowRight className="bg-white text-[#000306] p-1 text-xl rounded-full" />
            </button>
          </div>
        </>
      )}
      {pageState === 2 && (
        <>
          <div
            onClick={() => setPageState(0)}
            className="h-screen absolute bg-[#00030636] top-0 left-0 w-full"
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#000306] space-y-5 w-[80vw]  p-5 rounded-lg">
            <RxCross1
              onClick={() => setPageState(0)}
              className="text-white absolute right-2 top-2"
            />
            <p className="text-white text-center">
              Do you Confirm your <br /> Team Name as{" "}
              <span className="text-[#3CC4ED]">"{data.teamName}" </span>
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setPageState(1)}
                className="mx-auto flex items-center gap-x-2 text-white"
              >
                <FaArrowLeft className="bg-white text-[#000306] p-1 text-xl rounded-full" />
                Go back
              </button>
              <button
                onClick={() => setPageState(3)}
                className="mx-auto flex items-center gap-x-2 text-[#3CED63]"
              >
                Confirm
                <FaArrowRight className="bg-[#3CED63] text-[#000306] p-1 text-xl rounded-full" />
              </button>
            </div>
          </div>
        </>
      )}
      {pageState === 3 && (
        <>
          <div
            onClick={() => setPageState(0)}
            className="h-screen absolute bg-[#00030636] top-0 left-0 w-full"
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#000306] space-y-6 w-[80vw]  px-3 py-5 rounded-lg">
            <RxCross1
              onClick={() => setPageState(0)}
              className="text-white absolute right-2 top-2"
            />
            <label className="text-[#3CC4ED] text-sm font-semibold">
              Enter the Secret Code
            </label>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              handleChange={handlePasswordChange}
              inputRefs={inputRefs}
            />

            <button
              onClick={register}
              className="mx-auto flex items-center gap-x-2 font-semibold text-white"
            >
              Start Game
              <FaArrowRight className="bg-white text-[#000306] p-1 text-xl rounded-full" />
            </button>
          </div>
        </>
      )}
      {/* Footer */}
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

export default Register;
