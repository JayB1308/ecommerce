import React from 'react'
import Products from './Products'
const ProductList = ({products}) => {
  return (
    <div className="columns is-8-widescreen">
    {products.map((product)=>{
        return <Products className="column" key={product.id} product={product} />
    })}
    </div>
  )
}

export default ProductList