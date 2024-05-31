"use client"
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import React, { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import Skeleton from "@/components/Skeleton";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const productStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <Slider />
      <div className="mt-24 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">Featured Dishes</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId="6625ac6f503d0a78626e2db0" limit={4} />
        </Suspense>
      </div>
      <div className="mt-24 ">
        <h1 className="text-2xl md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">Categories Products</h1>
        <CategoryList />
      </div>
      <div className="mt-24 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">New Dishes</h1>
        <ProductList />
      </div>
    </div>
  );
}

export default HomePage;
