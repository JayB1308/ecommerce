import React from 'react'
import { Link } from 'react-router-dom'
const LoginMessage = () => {
  return (
    <section className="section has-text-centered">
    <h1 className="title">Please Login To Access The Page!</h1>
    <Link className="button is-warning" to="/login">Login</Link>
    </section>
  )
}

export default LoginMessage