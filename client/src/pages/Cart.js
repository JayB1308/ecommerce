import React from 'react';
import { useContext, useEffect, useState} from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Cart = () => {
  const {cart,setCart,user} = useContext(UserContext);
  let navigate = useNavigate();
  const [name,setName] = useState("");
  const [address,setAddress] = useState("");

  useEffect(()=>{
    if(cart.length === 0)
    {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
    
    if(localStorage.getItem("user") === null)
    {
      navigate("/emptycart");
    }
    else if(localStorage.getItem("cart") === null)
    {
      navigate('/emptycart');
    }

  });
  
  const handleIncreaseQuantity = (id) =>{
    let list = [];
    cart.forEach((item)=>{
      if(item.product.id === id)
      {
        item.quant +=1;
        list.push(item);
      }
      else{
        list.push(item);
      }
    })
    setCart(list);
    localStorage.setItem(
      "cart",JSON.stringify(list)
    )
  }

  const handleDecreaseQuantity = (id) =>{
    let list = [];
    cart.forEach((item)=>{
      if(item.product.id === id)
      {
        if(item.quant !== 1)
        {
        item.quant -=1;
        list.push(item);
        }
      }
      else
      {
        list.push(item);
      }
    });
    setCart(list);
    localStorage.setItem(
      "cart",JSON.stringify(list)
    )
  }

  const handleRemove = (product_id) =>{
    let list = [];
    cart.forEach((item)=>{
      if(item.product.id !== product_id)
      {
        list.push(item);
      }
    });
    console.log(list);
    setCart(list);
    localStorage.setItem(
      "cart",JSON.stringify(list)
    )
  }
  let products = [];
  let quantity = []; 

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = user.id;
    console.log(id);
    cart.forEach((item)=>{
      products.push(item.product.id);
      quantity.push(item.quant);
    });
    try{
    const response = await axios.post(`http://localhost:5000/orders/create/${id}`,
    {
      id:id,
      products:products,
      quantity:quantity,
      total:total_price,
      name:name,
      address:address,
      delivered:false
    });
    console.log(response);
  }
  catch(error)
  {
    console.log(error);
  }
  localStorage.removeItem("cart");
  navigate("/thanks"); 
}


  let total_price = 0;
  return (
    <>
    <div className="container box my-5">
    <h1 className='is-size-2'>Order Up!</h1>
    </div>
    <div className="container tile box is-parent is-vertical">
    <h3 className='is-size-3 is-child'>Review Order</h3>
    <table className="table is-child p-3">
    <thead>
    <tr>
    <td className='is-size-5'>Name</td>
    <td className='is-size-5'>Quantity</td>
    <td className='is-size-5'>Price</td>
    <td></td>
    </tr>
    </thead>
    <tbody>
    {cart.map((item)=>{
      const src = `/product/${item.product.id}`;
      const price = item.product.price * item.quant;
      total_price +=price;
      return (<tr key={item.product.id}>
        <td className='is-size-4'><Link to={src}>{item.product.name}</Link></td>
        <td className='is-size-5'>{item.quant}</td>
        <td className='has-text-weight-bold is-size-5'>${price}.00</td>
        <td><div className="buttons">
        <button className="button" onClick={()=> {handleDecreaseQuantity(item.product.id)}} >-</button>
        <button className="button" onClick={()=> {handleIncreaseQuantity(item.product.id)}}>+</button>
        <button className="button is-danger is-light" onClick={() => {handleRemove(item.product.id)}}>Remove</button>
        </div></td>
        </tr>
      )
    })}
    </tbody>
    <tfoot>
    <tr>
    <td className='has-text-weight-bold is-size-4'>Total Price</td>
    <td></td>
    <td className='has-text-weight-bold is-size-4'>${total_price}.00</td>
    </tr>
    </tfoot>
    </table>
    <form className="form">
    <div className="field">
    <label className="label">Name</label>
    <div className="control">
    <input type="text" className="input" placeholder = "Add Name.."
    value={name} onChange = {(e) => {setName(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Address</label>
    <div className="control">
    <textarea cols="30" rows="10" className="textarea" placeholder='Add Address..'
    value={address} onChange = {(e) => {setAddress(e.target.value)}}></textarea>
    </div>
    </div>
    <button className="button is-warning is-large has-text-weight-bold my-2" onClick={(e)=> {handleSubmit(e)}}>Place Order</button>
    </form>
    </div>
    </>
  )
}

export default Cart