import React from 'react'
import { Link } from 'react-router-dom'
const Products = ({product}) => {
  const src = `/product/${product.id}`
  return (
    <div className="card mx-2 p-1">
    <div className="card-image">
    <img src={product.img} alt="" />
    </div>
    <div className="card-content">
    <div className="content">
    <h4>{product.name}</h4>
    </div>
    </div>
    <div className="card-footer">
    <h3 className='card-footer-item'>${product.price}.00</h3>
    <Link className='card-footer-item button is-info' to={src}>See Details</Link>
    </div>
    </div>
  )
}

export default Products