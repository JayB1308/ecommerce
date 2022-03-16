import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
const Navbar = () => {
  const {user,setUser} = useContext(UserContext);
  let navigate = useNavigate();
  const handleSubmit = (e) =>{
    try {
      const User = {
        username:null,
        id:null
      }
      console.log("Logged Out!");
      localStorage.removeItem("user");
      setUser(User);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  let nav_end = <div className="buttons">
    <Link className="button is-primary" to='/register'>
    <strong>Sign Up</strong></Link>
    <Link className="button is-light is-warning is-medium" to='/login'>Login</Link>
    </div>
  
  if(localStorage.getItem("user")!== null)
  {
    const src = `/account/${user.id}`
    nav_end = <div className="buttons">
    <Link className = "button is-info" to={src}>Account</Link>
    <button className=" button is-danger" onClick={handleSubmit}>Logout</button>
    </div>
  }
  return (
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
  </div>
  <div className="navbar-menu">
    <div className="navbar-start">
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="navbar-item" to="/cart">Cart</Link>
        <Link className='navbar-item' to="/marketplace">Marketplace</Link>
    </div>
    <div className="navbar-end">
    <div className="navbar-item">
    {nav_end}
    </div>
    </div>
    </div>
</nav>
  )
}

export default Navbar;