"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';

const PaginatedProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.loading);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className='mt-12'>
      <div className='flex gap-x-8 gap-y-16 justify-between flex-wrap'>
        {productsToShow.map((product) => (
          <div key={product._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
            <Link href={`/product/${product._id}`}>
              <div className='relative w-full h-80'>
                {product.image && (
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    fill
                    sizes='25vw'
                    className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500'
                  />
                )}
                <Image
                  src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
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
      <div className='flex justify-between mt-8'>
        <button
          className='py-2 px-4 bg-gray-200 rounded'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className='py-2 px-4 bg-gray-200 rounded'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedProductList;
