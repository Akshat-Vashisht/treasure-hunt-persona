import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { RxCross1, RxArrowLeft } from "react-icons/rx";
import PasswordInput from "../Components/PasswordInput";
import { axiosConfig } from "../axiosConfig";
const Register = ({ teamName, setTeamName }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    teamName: "",
    adminPass: "",
  });
  const [password, setPassword] = useState(Array(6).fill(""));
  const [pageState, setPageState] = useState(1);
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
        setLoading(true);
        const res = await axiosConfig.post("/", newState);
        console.log(res);
        if (res.status === 200) {
          setTeamName(teamName);
          navigate("/game");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
  const loader = (
    <div className="w-6 h-6 mx-auto border-2 border-transparent border-b-white border-l-white animate-spin rounded-full"></div>
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
 





  
  return (
    <div className="bg-[#02141E] h-screen overflow-hidden flex flex-col items-center justify-center px-8">
      <div className="grid grid-cols-6">
        <div className=" flex flex-col justify-center items-center col-span-2">
          <img  src="./assets/register-bg.png" alt="Treasure hunt logo" />
          <img
            className="-mt-10"
            src="./assets/treasurehunt-txt.svg"
            alt="Treasure hunt text"
          />
        </div>

        <div className="col-span-4 flex flex-col items-center justify-center">
          {/* Body */}
          {pageState === 1 && (
            <>
              <div className="bg-[#000306] space-y-5 px-3 py-5 rounded-lg w-[20rem]">
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
              <div className="bg-[#000306] space-y-5 p-5 rounded-lg w-[20rem]">
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
              <div className="bg-[#000306] space-y-6 w-[20rem]  px-3 py-5 rounded-lg relative">
                <button
                  onClick={() => setPageState(1)}
                  className="absolute right-1 top-1 p-1 border border-white rounded-full text-white"
                >
                  <RxArrowLeft />
                </button>
                <label className="text-[#3CC4ED] text-sm font-semibold">
                  Enter the Secret Code
                </label>
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  handleChange={handlePasswordChange}
                  inputRefs={inputRefs}
                />
                {loading ? (
                  loader
                ) : (
                  <button
                    onClick={register}
                    className="mx-auto flex items-center gap-x-2 font-semibold text-white"
                  >
                    Start Game
                    <FaArrowRight className="bg-white text-[#000306] p-1 text-xl rounded-full" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

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
