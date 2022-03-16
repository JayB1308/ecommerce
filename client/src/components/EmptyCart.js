import React from 'react'
import { Link } from 'react-router-dom'
const EmptyCart = () => {
  return (
    <section className="section has-text-centered">
    <h1 className="title my-3">Sorry!</h1>
    <h1 className='is-size-2 my-1'>It Appears Your Cart Is Empty!</h1>
    <Link className="button is-large is-warning m-4" to="/marketplace">Go To Marketplace</Link>
    </section>
  )
}

export default EmptyCart;