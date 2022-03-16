import React from 'react'
import { UserContext } from '../context/UserContext';
import { useContext,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeliveryPage = () => {

  const {cart,setCart} = useContext(UserContext);
  let total_price = 0;
  const [name,setName] = useState("")
  const [address,setAddress] = useState("");

  useEffect(()=>{
    if(cart.length === 0)
    {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  });

  let navigate = useNavigate();
  const handlePlaceOrder = async (e) =>{
    e.preventDefault();
    try {
      const orderId = JSON.parse(localStorage.getItem("orderId"));
      const response = await axios.post(`http://localhost:5000/orders/delivery/create/${orderId}`,{
        name:name,
        address:address,
        status:"pending"
      });
      console.log(response);
      localStorage.removeItem("cart");
      localStorage.removeItem('orderId');
      navigate('/');
    } catch (error) {
     console.log(error); 
    }
  }

  return (
    <>
    <div className="container box my-5">
    <h1 className='is-size-1 my-2'>Enter Delivery Details!</h1>
    <div className="tile is-ancestor">
    <div className="tile is-parent box is-5">
    <form className="is-child">
    <div className="field">
    <label className="label">Name</label>
    <div className="control">
    <input type="text" value={name} onChange={(e)=> {setName(e.target.value)}} className="input" placeholder='Add Name'/>
    </div>
    </div>
    <div className="field">
    <label className="label">Delivery Address</label>
    <div className="control">
    <textarea cols="30" rows="10" className="textarea" placeholder='Add Delivery Address..'
    value={address}
    onChange = {(e)=> {setAddress(e.target.value)}}></textarea>
    </div>
    </div>
    <button className="button is-warning" onClick={(e)=> {handlePlaceOrder(e)}}>Place Order!</button>
    </form>
    </div>
    <div className="tile is-parent">
    <table className="table">
    <thead>
    <tr>
    <th>Product</th>
    <th></th>
    <th>Price</th>
    </tr>
    </thead>
    <tbody>
    {cart.map((item)=>{
      let price = item.product.price * item.quant;
      total_price +=price
      return (<tr>
        <td className='has-text-weight-bold'>{item.product.name}</td>
        <td></td>
        <td className='has-text-weight-bold'>${price}.00</td>
        </tr>
      )
    })}
    </tbody>
    <tfoot>
    <tr>
    <td className='has-text-weight-bold is-size-4'>Total Price:</td>
    <td></td>
    <td className='has-text-weight-bold is-size-4'>${total_price}.00</td>
    </tr>
    </tfoot>
    </table>
    </div>
    </div>
    </div>
    </>
  )
}

export default DeliveryPage