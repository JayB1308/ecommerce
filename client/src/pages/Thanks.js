import React from 'react'
import { useNavigate } from 'react-router-dom'

const Thanks = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/');
    }

  return (
    <section className="section container box my-6">
    <h1 className='title has-text-centered'>Thank You!</h1>
    <h3 className='subtitle has-text-centered'>Your Support Is Appreciated</h3>
   <div className="container has-text-centered">
   <button className='button is-large is-info' onClick={()=> {handleClick()}}>Continue Shopping!</button>
   </div>
    </section>
  )
}

export default Thanks