import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const ProductDetails = () => {
  //Data Fetching State
  const [product,setProduct] = useState({});
  const [reviews,setReviews] = useState([]);

  //Form input state
  const [rating,setRating] = useState(0);
  const [review,setReview] = useState("");

  const {cart,setCart} = useContext(UserContext);

  console.log(rating);
  console.log(review);

  const {id} = useParams();
  const {user} = useContext(UserContext);
  console.log(user);
  
  const getProduct = async () =>{
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      console.log(response.data.data.product);
      setProduct(response.data.data.product);
    } catch (error) {
      console.log(error);
    }
  }

  const getReviews = async () =>{
    try {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      console.log(response.data.data.reviews);
      setReviews(response.data.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProduct();
    getReviews();
  },[]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/reviews/create/${id}`,{
        userid:user.id,
        username:user.username,
        review:review,
        rating:rating
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCart = (e) =>{
    e.preventDefault();
    try {
      const cart_item = {
        product:product,
        quant:1
      }
      cart.push(cart_item);
      setCart(cart);
      localStorage.setItem("cart",JSON.stringify(cart));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="container box">
    <div className="tile is-ancestor">
    <div className="tile is-parent is-4">
    <article className="tile is-child box">
    <img src={product.img} alt="" />
    <h2 className='title has-text-centered my-3'>${product.price}.00</h2>
    </article>
    </div>
    <div className="tile is-8 m-4 is-parent box is-vertical">
    <h1 className='title is-child'>{product.name}</h1>
    <p className="content is-child">{product.descp}</p>
    <button 
    onClick = {handleAddToCart}
    className="button is-large is-info">Add To Cart</button>
    </div>
    </div>
    <div className="tile is-ancestor">
    <div className="tile is-parent box">
    <form action="" className="tile is-child">
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Add Rating</h1></label>
    <div className="control">
    <div className="select">
    <select
    value={rating}
    onChange = {(e)=> setRating(e.target.value)}
    placeholder = "Add a rating"
    >
    <option disabled>Add Rating</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    </div>
    <button
    onClick={handleSubmit}
    className='button is-info mx-5 is-hovered'>Add Review</button>
    </div>
    </div>
    <div className="field">
    <label className="label"><h1 className='is-size-4'>Review</h1></label>
    <div className="control">
    <textarea 
    value={review}
    onChange = {(e)=> setReview(e.target.value)}
    rows="10" className="textarea" placeholder="Add Your Review.."></textarea>
    </div>
    </div>
    </form>
    </div>
    <div className="tile is-parent">
    <table className="table is-child box is-12">
    <thead>
    <tr>
    <td>By</td>
    <td>Rating</td>
    <td>Review</td>
    </tr>
    </thead>
    <tbody>
    {reviews.map((review)=>{
      return(
        <tr>
        <td>{review.username}</td>
        <td>{review.rating}</td>
        <td>{review.review}</td>
        </tr>
      )
    })}
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </>
  )
}

export default ProductDetails;