import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    teamName: "",
    adminPass: {display:"", value:""},
  });
  const [pageState, setPageState] = useState(0);

  async function register() {
    const {teamName, adminPass} = data;
    const newState = {
      teamName,
      adminPass:adminPass.value
    }
    // setData({...data,adminPass:data.adminPass.value});
    console.log(newState);
    // try {
    //   const res = await axios.post("http://localhost:5000/", data);
    //   console.log(res);
    //   if (res.status === 200) {
    //     navigate("/game");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    let displayedValue = '';
    for (let i = 0; i < rawValue.length; i++) {
      displayedValue += rawValue[i];
      if ((i + 1) % 3 === 0 && i + 1 !== rawValue.length) {
        displayedValue += '-';
      }
    }
    setData({...data,adminPass:{
      display:displayedValue,
      value:rawValue
    }})

  };


  return (
    <div
      style={{
        background: "url(./assets/register-bg.png) no-repeat center fixed",
        backgroundSize: "cover",
      }}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-10 bg-black bg-opacity-20 border border-white border-opacity-15 backdrop-blur-sm shadow-sm w-[80vw] rounded-md p-4">
        <h1 className="text-white font-semibold text-2xl text-center">
          Register
        </h1>
        {pageState == 0 ? (
          <div className="relative">
            <label htmlFor="teamName" className="text-sm text-slate-100">
              Team Name
            </label>
            <input
              placeholder="Enter the Team Name"
              className="w-full border-2 placeholder:text-slate-100 text-white border-white focus:outline-none focus:bg-white focus:bg-opacity-15 p-2 rounded-md bg-transparent"
              type="text"
              name="teamName"
              value={data.teamName}
              onChange={handleChange}
              id="teamName"
            />
            {data.teamName.length > 3 && (
              <FaArrowRight onClick={()=>setPageState(1)} className="cursor-pointer absolute border-2 p-[3px] w-6 h-6 right-2 top-[34px] rounded-full  border-white text-white" />
            )}
          </div>
        ) : (
          <div className="relative">
          <label htmlFor="adminPass" className="text-sm text-slate-100">
            Secret Code
          </label>
          <input
            placeholder="Enter the Secret Key"
            className="w-full border-2 placeholder:text-slate-100 autofill:bg-white autofill:bg-opacity-15 text-white border-white focus:outline-none focus:bg-white focus:bg-opacity-15 p-2 rounded-md bg-transparent"
            type="text"
            name="adminPass"
            value={data.adminPass.display}
            onChange={handleInputChange}
            id="adminPass"
          />
           <button onClick={register} disabled={data.adminPass.length>=4} className={` w-full border-2 text-white bg-white bg-opacity-0 mt-5 ${data.adminPass.length>=4 ?"hover:bg-opacity-10" : ""} p-1 rounded-md`}>Start the Game</button>   
        </div>
        )}
      </div>
    </div>
  );
};

export default Register;
