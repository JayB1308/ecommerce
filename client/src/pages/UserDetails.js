import React, { useEffect, useState } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
const UserDetails = () => {
  
  const {user}  = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const [reviews,setReviews] = useState([]);
  const [orders,setOrders] = useState([]);

  let adminButton = <div></div>;
  if(user.role === "admin")
  {
    adminButton = <div className="container box">
    <h3 className='is-size-4'>Visit Admin Panel:</h3>
    <Link to = "/admin" className='button is-primary'>Admin</Link>
    </div>
  }

  const getUserDetails = async () =>{
    try {
      const src = `http://localhost:5000/user/${id}`;
      const response = await axios.get(src);
      console.log(response.data.data.user);
      setName(response.data.data.user.name);
      setEmail(response.data.data.user.email);
    } catch (error) {
      console.log(error);
    }
  }

  const getReviews = async () =>{
    try {
      const src = `http://localhost:5000/reviews/user/${id}`;
      const response = await axios.get(src);
      console.log(response.data.data.reviews);
      setReviews(response.data.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }

  const getOrders = async () =>{
    try{
      const src = `http://localhost:5000/orders/user/${id}`;
      const response = await axios.get(src);
      console.log("Orders", response.data.data.orders);
      setOrders(response.data.data.orders);
    }catch(error)
    {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserDetails();
    getReviews();
    getOrders();
  },[]);
  return (
    <>
    <div className="container box">
    <div><h2 className="is-size-1"> Welcome {user.username}!</h2></div>
    <div className="container my-5">
    <h1 className='has-text-weight-bold is-size-3'>Name:</h1>
    <h2 className="is-size-4">{name}</h2>
    </div>
    <div className="container my-5">
    <h1 className='has-text-weight-bold is-size-3'>Email:</h1>
    <h2 className="is-size-4">{email}</h2>
    </div>
    {adminButton}
    <div className="container box">
    <div className="columns">
    <div className="column">
    <h2 className='has-text-weight-bold is-size-3 '>Reviews</h2>
    <table className="table is-size-5">
    <thead>
    <tr>
    <th>Product</th>
    <th>Rating</th>
    <th>Review</th>
    <th></th>
    </tr>
    </thead>
    <tbody>
    {reviews.map((review)=>{
      const src = `/product/${review.id}`
      return(<tr>
        <td><Link to={src}>{review.name}</Link></td>
        <td>{review.rating}</td>
        <td>{review.review}</td>
        </tr>
      )
    })}
    </tbody>
    </table>
    </div>
    <div className="column">
    <h2 className='has-text-weight-bold is-size-3'>Orders</h2>
    <table className="table is-size-5">
    <thead>
    <tr>
    <th>Order ID</th>
    <th>Price</th>
    </tr>
    </thead>
    <tbody>
    {orders.map((order)=>{
      const src = `/order/${order.id}`
      return(<tr>
        <td><Link to={src}>{order.id}</Link></td>
        <td>${order.total}.00</td>
        </tr>
      )
    })}
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default UserDetails