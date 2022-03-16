import React, { useEffect, useState } from 'react';
import axios from "axios";
import ProductList from './ProductList';
import { Link } from 'react-router-dom';
const HomeProduct = () => {
  const [products,setProducts] = useState([]);
  
  const getProducts = async ()  =>{
    const response = await axios.get('http://localhost:5000/products/top/4');
    console.log(response.data.data.products);
    setProducts(response.data.data.products);
  }

  useEffect(()=>{
    getProducts();
  },[]);

  return (
    <div className='container'>
    {products && <ProductList products={products} />}
    <Link to='/marketplace' className='button is-primary is-medium is-light my-6'>See More!</Link>
    </div> 
  )
}

export default HomeProduct