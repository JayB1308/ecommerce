import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const AdminProducts = () => {

    const [products,setProducts] = useState([]);

    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [price,setPrice] = useState(0);
    const [stock,setStock] = useState(0);

    const getProducts = async () =>{
        try {
          const response = await axios.get("http://localhost:5000/products/");
          console.log(response.data.data.products);
          setProducts(response.data.data.products);
        } catch (error) {
          console.log(error);
        }
      }

    const createProduct = async () =>{
        try {
              const response = await axios.post("http://localhost:5000/products/create",
              {
                  name:name,
                  img:image,
                  desc:desc,
                  rating:null,
                  numReviews:0,
                  price:price,
                  count:stock
              });
              console.log(response);
          }catch (error) {
              console.log(error);
        }
      }

      const handleSubmit = (e) =>{
          e.preventDefault();
          createProduct();
      }
    
    const removeProduct = async (id) => {
        try {
            const src = `http://localhost:5000/products/delete/${id}`;
            const response = axios.delete(src);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (e,id) =>{
        e.preventDefault();
        removeProduct(id);
    }
      useEffect(()=>{
        getProducts();
      },[]);

  return (
    <>
    <div className="container box my-4 columns">
    <div className="column container mx-3">
    <h2 className='is-size-3'>Products</h2>
    <table className="table my-3">
    <thead>
    <tr>
    <th>Product ID</th>
    <th>Name</th>
    <th>Price</th>
    <th>Stock</th>
    <th></th>
    <th></th>
    </tr>
    </thead>
    <tbody>
    {products.map((product)=>{
        const src = `/admin/update/${product.id}`;
      return(<tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>${product.price}.00</td>
        <td>{product.countstock}</td>
        <td><Link to={src} className="button is-warning">Update</Link></td>
        <td><button className="button is-danger" onClick={(e)=> {handleDelete(e,product.id)}}>Delete</button></td>
        </tr>
      )
    })}
    </tbody>
    </table>
    </div>
    <div className="column">
    <form className="box container">
    <h1 className='is-size-3'>Create A Product</h1>
    <div className="field">
    <label className="label">Name</label>
    <div className="control">
    <input type="text" className="input" placeholder='Enter product name..'
    value = {name}
    onChange = {(e)=> {setName(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Image URL</label>
    <div className="control">
    <input type="text" className="input" placeholder='Enter image url..'
    value = {image}
    onChange = {(e) => {setImage(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Description</label>
    <div className="control">
    <textarea className='textarea' cols="30" rows="10" placeholder='Enter product description..'
    value={desc}
    onChange={(e)=> {setDesc(e.target.value)} }></textarea>
    </div>
    </div>
    <div className="field">
    <label className="label">Price</label>
    <div className="control">
    <input type="number" className="input" placeholder='Enter price..'
    value = {price}
    onChange = {(e)=> {setPrice(e.target.value)}}/>
    </div>
    </div>
    <div className="field">
    <label className="label">Stock </label>
    <div className="control">
    <input type="text" className="input" placeholder='Enter stock quantity..'
    value ={stock}
    onChange = {(e) => {setStock(e.target.value)}}/>
    </div>
    </div>
    <button className="button is-info" onClick ={(e) => {handleSubmit(e)}}>Submit</button>
    </form>
    </div>
    </div>
    </>
  )
}

export default AdminProducts;