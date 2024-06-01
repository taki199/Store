"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchDishesByCategoryAsync } from '../features/categorySlice';
import { addToCart } from '../features/cartSlice';
import { slugify } from '../store/utils/slugify'; // Import the slugify function

interface ProductListProps {
  categoryId?: string;
  limit?: number;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId, limit }) => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.category.dishesByCategory);
  const isLoading = useAppSelector((state) => state.category.loading);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchDishesByCategoryAsync(categoryId));
    }
  }, [categoryId, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const productsToShow = limit ? dishes.slice(0, limit) : dishes;

  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      {productsToShow.map((product) => (
        <div key={product._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
          <Link href={`/${slugify(product.name)}-${product._id}`}>
            <div className='relative w-full h-80'>
              {product.image && (
                <Image
                  src={product.image.url || '/product.png'}
                  alt={product.name}
                  fill
                  sizes='25vw'
                  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500'
                />
              )}
              <Image
                src={product.image.url || '/product.png'}
                alt={product.name}
                fill
                sizes='25vw'
                className='absolute object-cover rounded-md'
              />
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
