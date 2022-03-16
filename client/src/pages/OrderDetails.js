import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {

    const {id} = useParams();

    const [order,setOrder] = useState({});

    const getOrder = async () =>{
        try {
            const src = `http://localhost:5000/orders/${id}`;
            const response = await axios.get(src);
            console.log(response.data.data.order);
            setOrder(response.data.data.order);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getOrder();
    },[]);

  return (
    <div className="container box">
    <h1 className='is-size-1 has-text-weight-bold my-3'>Order No. {order.id}</h1>
    <h3 className='is-size-3 has-text-weight-bold my-3'>Name:</h3>
    <h3 className='is-size-5'>{order.name}</h3>
    <h3 className='is-size-3 has-text-weight-bold my-3'>Address:</h3>
    <h3 className='is-size-5'>{order.address}</h3>
    <h3 className='is-size-3 has-text-weight-bold my-3'>Total:</h3>
    <h3 className='is-size-5'>${order.total}.00</h3>
    </div>
  )
}

export default OrderDetails