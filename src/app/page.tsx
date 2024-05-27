"use client"

import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"

const HomePage = () => {
 
  return (
    <div className=''>
      <Slider/>
      <div className="mt-24 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">Featured Dishes</h1>
        <ProductList/>
      </div>
      <div className="mt-24 ">
        <h1 className="text-2xl md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">Categories Products</h1>
        <CategoryList/>
      </div>
      <div className="mt-24 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">New Dishes</h1>
        <ProductList/>
      </div>
    </div>
  )
}

export default HomePage