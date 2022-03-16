import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminUsers = () => {

    let navigate = useNavigate();

    const [deleteUserName,setDeleteUserName] = useState("");
    const [username,setUserName] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const createAdmin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/user/register",
            {
                username:username,
                name:name,
                email:email,
                password:confirmPassword,
                role:"admin"
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateAdmin = () => {
        createAdmin();
        navigate('/admin');
    }

    const deleteUser = async () => {
        try {
            const id = await axios.post("http://localhost:5000/user/username", {
                username:deleteUserName
            });
            console.log(id.data.user.id); 
            const response = await axios.delete(`http://localhost:5000/user/delete/${id.data.user.id}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = () => {
        deleteUser();
    }

  return (
    <>
    <div className="container box">
    <h1 className='is-size-1 my-3'>Users:</h1>
    <div className="box">
    <div className="field">
    <label className="label">UserName:</label>
    <div className="control">
    <input className='input' type="text" placeholder='Enter a username' 
    value={deleteUserName} onChange = {(e)=> {setDeleteUserName(e.target.value)}}/>
    </div>
    </div>
    <button className="button is-danger" onClick={(e) => {handleDelete()}}>Delete User</button>
    </div>
    <div className="box my-3">
    <h2 className='is-size-3'>Create An Admin:</h2>
    <div className="field">
    <label className="label">Username</label>
    <div className="control">
    <input type="text" className="input" placeholder='Enter username..'
    value={username} onChange = {(e)=> {setUserName(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Name</label>
    <div className="control">
    <input type="text" className="input" placeholder='Enter name..' 
    value={name} onChange = {(e)=> {setName(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Email</label>
    <div className="control">
    <input type="email" className="input" placeholder='Enter email..'
    value={email} onChange = {(e)=> {setEmail(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Password</label>
    <div className="control">
    <input type="password" className="input" placeholder='Enter password..'
    value={password} onChange = {(e)=> {setPassword(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Confirm Password</label>
    <div className="control">
    <input type="password" className="input" placeholder='Confirm password..'
    value={confirmPassword} onChange = {(e)=> {setConfirmPassword(e.target.value)}}/>
    </div>
    </div>
    <button className="button is-success" onClick={()=> {handleCreateAdmin()}}>Create Admin</button>
    </div>
    </div>
    </>
  )
}

export default AdminUsers