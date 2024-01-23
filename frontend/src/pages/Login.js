import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    teamName : "",
    adminPass: ""
  })
  async function login() {
    try {
      const res = await axios.post("http://localhost:5000/", data);
      console.log(res);
      if(res.status == 200){
        navigate('/game');
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleChange=(event)=>{
    const {name, value} = event.target;
    setData({
      ...data,
      [name]:value
    })
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="border w-[25rem] text-center px-4 py-10 rounded-lg">
        <h1 className="mb-10 text-xl">Login</h1>
        <div className="flex flex-col gap-y-2">
          <label className="text-left" htmlFor="team_name">
            Team Name
          </label>
          <input
            placeholder="Enter Team Name"
            className="px-2 py-1 border focus:outline-none rounded-md"
            value={data.teamName}
            onChange={handleChange}
            name="teamName"
            type="text"
          />
          <label className="text-left" htmlFor="adminPass">
            Password
          </label>
          <input
            placeholder="Password"
            className="px-2 py-1 border focus:outline-none rounded-md"
            value={data.adminPass}
            onChange={handleChange}
            name="adminPass"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={login}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
