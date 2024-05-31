"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCategories } from '../features/categorySlice';

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories = [], loading, error } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log(categories)
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='category-list-wrapper px-4'>
      <Slider {...settings}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link key={category._id} href={`/list?cat=${category.name}`} className='p-2'>
              <div className='relative bg-slate-100 w-full h-96 rounded-lg overflow-hidden shadow-lg'>
                <Image
                  src={category.image.url}
                  alt={category.name}
                  layout='fill'
                  objectFit='cover'
                  className='object-cover'
                />
              </div>
              <h1 className='mt-4 font-medium text-lg text-center'>{category.name}</h1>
            </Link>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </Slider>
    </div>
  );
};

export default CategoryList;
