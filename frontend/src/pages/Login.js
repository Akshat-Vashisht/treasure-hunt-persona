import React from 'react'
import axios from 'axios'

const Login = () => {

  async function login() {
    window.open("http://localhost:5000/auth/google", "_self");
  // }
    try {
      const res = await axios.get('http://localhost:5000/auth/google', { withCredentials: true });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div>
      <button onClick={login}>Login with google</button>
    </div>
  )
}

export default Login