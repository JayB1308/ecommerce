import React from 'react'
import { Link } from 'react-router-dom'
import HomeProduct from '../components/HomeProduct'
const Home = () => {
  return (
    <>
    <section className="hero is-medium is-success">
    <div className="hero-body">
    <h1 className='title is-1'>Shop Till Your Drop!</h1>
    <h3 className="subtitle">The Best Products...</h3>
    <Link className="button is-light is-large is-hovered is-outlined" to="/marketplace">Get Started</Link>
    </div>
    </section>
    <div className="container">
    <HomeProduct />
    </div>
    </>
  )
}

export default Home