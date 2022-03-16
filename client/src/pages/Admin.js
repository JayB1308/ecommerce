import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../context/UserContext';
const Admin = () => {

  const {user,setUser} = useContext(UserContext);
  if(user.id === null)
  {
    const checkUser = JSON.parse(localStorage.getItem("user"));
    setUser(checkUser);
  }

  return (
    <>
    <div className="container box my-6">
    <h1 className="is-size-1">Welcome {user.username}!</h1>
    <div className="box">
    <h2 className="is-size-3 my-3">Manage Products:</h2>
    <Link className="button is-link" to="/admin/products">Products</Link>
    </div>
    <div className="box">
    <h2 className="is-size-3 my-3">Manage Users:</h2>
   <Link className="button is-link" to="/admin/users">Users</Link>
    </div>
    <div className="box">
    <h2 className="is-size-3 my-3">Manage Orders:</h2>
    <Link className="button is-link" to="/admin/orders">Orders</Link>
    </div>
    </div>
    </>
  )
}

export default Admin