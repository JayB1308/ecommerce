import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
const AdminProductUpdate = () => {

    const [product,setProduct] = useState({});
    const [newPrice,setNewPrice] = useState(product.price);
    const  [stock, setStock] = useState(0);
    const {id} = useParams();
    let navigate = useNavigate();
    const originalStock = product.countstock;

    const getProduct = async () =>{
        try {
            const src = `http://localhost:5000/products/${id}`;
            const response = await axios.get(src);
            console.log(response.data.data.product);
            setProduct(response.data.data.product);
            setStock(response.data.data.product.countstock);
        } catch (error) {
            console.log(error);
        }
    }

    const addStock = () =>{
        setStock(stock+1);
    }

    const subStock = () =>{
        setStock(stock-1);
    }

    const updateStock = async (id) =>{
        try {
            const src = `http://localhost:5000/products/update/${id}`;
            const response = await axios.post(src, {
                addStock:stock-originalStock
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const updatePrice = async (id) => {
        try {
            const src = `http://localhost:5000/products/update/price/${id}`;
            const response = await axios.post(src, {
                newprice: newPrice
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (id) =>{
        updateStock(id);
        updatePrice(id);
        navigate("/admin/products");
    }

    useEffect(()=>{
        getProduct();
    },[]);

  return (
    <>
    <div className="container box my-4">
    <h1 className="is-size-1">{product.name}</h1>
    <h2 className="is-size-2 has-text-weight-bold">Price: ${product.price}.00</h2>
    <img src = {product.img} alt="" className='image my-5'/>
    <h1 className="is-size-2">Update Stock</h1>
    <h2 className="is-size-3 has-text-weight-bold">{stock}</h2>
    <div className="buttons my-2">
    <button className="button is-large" onClick={addStock}>+</button>
    <button className="button is-large" onClick={subStock}>-</button>
    </div>
    <form action="">
    <div className="field">
    <label className="label">Update Price:</label>
    <div className="control">
    <input type="text" className="input" placeholder='Enter new price..'
    value = {newPrice}
    onChange = {(e) => {setNewPrice(e.target.value)}}/>
    </div>
    </div>
    </form>
    <button className="button is-warning is-large my-3" onClick={() => {handleSubmit(product.id)}}>Update</button>
    </div>
    </>
  )
}

export default AdminProductUpdate;