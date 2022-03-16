import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
const Login = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login",{
        username:username,
        password:password
      });
      console.log(response.data.status);
      console.log(response.data.username);
      if(response.data.status === "Authorized")
      {
        const user = {
          username:response.data.username,
          id:response.data.id,
          role:response.data.role
        }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <>
      <h1 className='has-text-centered has-text-weight-light title is-size-1 my-5'>Login</h1>
      <form action="" className="container box m-5">
      <div className="field">
      <label className="label"><h1 className='is-size-4'>Username</h1></label>
      <div className="control">
      <input type="text" value = {username} onChange = {(e)=> setUserName(e.target.value)} className="input" placeholder='Enter your username..' />
    </div>
    </div>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Password</h1></label>
    <div className="control">
    <input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)} className="input" placeholder='Enter your password..' />
    </div>
    </div>
    <div className="field">
    <div className="container">
    <button type="submit" onClick={handleSubmit} className='button is-success is-large is-hovered my-2'>Submit</button>
    </div>
    </div>
      </form>
      <h2 className='is-size-5 has-text-centered has-text-weight-bold'>Don't Have An Account?<Link to="/register">Register Here!</Link></h2>
      </>
  )
}

export default Login