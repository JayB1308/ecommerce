import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';
const AdminOrders = () => {

    const [orders,setOrders] = useState([]);
    let pendingOrders = [];
    let completedOrders = [];
    const getAllOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/orders/");
            console.log(response.data.data.orders);
            setOrders(response.data.data.orders);
        } catch (error) {
            console.log(error);   
        }
    }
    orders.forEach((order)=>{
        if(order.delivered === false)
        {
            pendingOrders.push(order);
        }
        else{
            completedOrders.push(order);
        }
    })

    useEffect(()=>{
        getAllOrders();
    },[]);

    console.log(pendingOrders);
    console.log(completedOrders);

    const checkDelivered = async (id) => {
        try {
            const src = `http://localhost:5000/orders/update/${id}`;
            const response = await axios.post(src);
            console.log(response);
        } catch (error) {
            console.log(error);   
        }
    }


    const handleDelivered = (id,e) => {
        checkDelivered(id);
    }

  return (
    <>
    <div className="container box my-3">
    <h1 className="is-size-1">Orders</h1>
    <h2 className="is-size-3">Pending Orders:</h2>
    <table className="table is-fullwidth">
    <thead>
    <tr>
    <th>Order ID</th>
    <th>Total Amount</th>
    <th>User ID</th>
    <th></th>
    </tr>
    </thead>
    <tbody>
    {pendingOrders.map((order) => {
        return(<tr>
            <td>{order.id}</td>
            <td>${order.total}.00</td>
            <td>{order.userid}</td>
            <td><button className="button is-warning" onClick={() => {handleDelivered(order.id)}}>Check Delivery</button></td>
            </tr>
        )
    })}
    </tbody>
    </table>
    <table className="table is-fullwidth">
    <thead>
    <tr>
    <th>Order ID</th>
    <th>Total Amount</th>
    <th>User ID</th>
    <th></th>
    </tr>
    </thead>
    <tbody>
    {completedOrders.map((order) => {
        return(<tr>
            <td>{order.id}</td>
            <td>${order.total}.00</td>
            <td>{order.userid}</td>
            <td><button className="button disabled">Delivered</button></td>
            </tr>
        )
    })}
    </tbody>
    </table>
    </div>
    </>
  )
}

export default AdminOrders