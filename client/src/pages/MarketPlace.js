import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MarketPlace = () => {
  const [products,setProducts] = useState([]);
  
  const getProducts = async ()  =>{
    const response = await axios.get('http://localhost:5000/products');
    console.log(response.data.data.products);
    setProducts(response.data.data.products);
  }

  useEffect(()=>{
    getProducts();
  },[]);
  return (
    <table className="table container box my-4 is-striped is-fullwidth">
      <thead className="thead">
        <tr className='is-size-4'>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product)=>{
          const src = `/product/${product.id}`;
          return (<tr>
            <td><img src={product.img} alt=""/></td>
            <td><Link className='is-size-4' to={src}>{product.name}</Link></td>
            <td className='has-text-weight-bold is-size-5'>${product.price}.00</td>
            </tr>)
        })}
        </tbody>
    </table>
  )
}

export default MarketPlace