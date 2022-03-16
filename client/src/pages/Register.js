import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {

  let navigate = useNavigate();

  const [username,setUserName] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  console.log(username);
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  
  const handleSubmit = async (e) =>{ 
    e.preventDefault();
    try {
      if(password === confirmPassword)
    {
      const response = await axios.post("http://localhost:5000/user/register",
      {
        username:username,
        name:name,
        email:email,
        password:confirmPassword,
        role:"user"
      });
      console.log(response.data.status);
      if(response.data.status === "Success")
      {
        navigate("/login");
      }
    }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <h1 className='has-text-centered has-text-weight-light title is-1 my-5'>Register</h1>
    <form action="" className='container box m-5'>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Username</h1></label>
    <div className="control">
    <input type="text" value={username} onChange = {(e) => setUserName(e.target.value)} className="input" placeholder='Enter your username..' />
    </div>
    </div>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Name</h1></label>
    <div className="control">
    <input type="text" value = {name} onChange = {(e)=> setName(e.target.value)} className="input" placeholder='Enter your username..' />
    </div>
    </div>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Email</h1></label>
    <div className="control">
    <input type="email" value = {email} onChange = {(e)=> setEmail(e.target.value)} className="input" placeholder='Enter your email..' />
    </div>
    </div>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Password</h1></label>
    <div className="control">
    <input type="password" value ={password} onChange = {(e) => setPassword(e.target.value)} className="input" placeholder='Enter your password..' />
    </div>
    </div>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Confirm Password</h1></label>
    <div className="control">
    <input type="password" value={confirmPassword} onChange = {(e)=> setConfirmPassword(e.target.value)} className="input" placeholder='Please confirm your password..' />
    </div>
    </div>
    <div className="field">
    <button type="submit" onClick={handleSubmit}  className='button is-success is-large is-hovered my-2'>Submit</button>
    </div>
    </form>
    </>
  )
}

export default Register