// components/ProductList.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';

const ProductList: React.FC = () => {
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
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      {products.map((product) => (
        <div key={product._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
          <Link href={`/product/${product._id}`}>
            <div className='relative w-full h-80'>
              <Image src={product.image.url} alt={product.name} fill sizes='25vw' className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500' />
              <Image src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" alt={product.name} fill sizes='25vw' className='absolute object-cover rounded-md' />
            </div>
          </Link>
          <div className='flex justify-between'>
            <span className='font-medium'>{product.name}</span>
            <span className='font-semibold'>${product.price}</span>
          </div>
          <div className='text-sm text-gray-500'>{product.description}</div>
          <button
            className='rounded-2xl ring-1 ring-err text-err w-max py-2 px-4 text-xs hover:bg-err hover:text-white'
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
