import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

function ProductsList() {
  const { products } = useSelector(state => state.products);
  return (
    <>
    <div className='w-full flex flex-row gap-5 overflow-scroll overflow-y-hidden ' >
      {
        products && products.map((product) => {
           return <ProductCard key={product._id} product = {product} />
        })
      }
    </div>
    </>
  )
}

export default ProductsList