import Filter from '@/components/Filter';
import CategoryList from '@/components/CategoryList';
import DishList from '@/components/DishList';
import Image from 'next/image';
import React from 'react';

const ListPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
      {/* campaign */}
      <div className="hidden bg-black px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-white">
            Grab up to 50% on first Order <br /> and get Free delivery
          </h1>
          <button className="rounded-3xl bg-[#28AF61] text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* Filter */}
      <Filter />
      {/* Category List */}
      {/* <CategoryList /> */}
      {/* Dish List */}
      <h1 className='mt-12 text-xl font-semibold'>Dishes For You</h1>
      <DishList />
    </div>
  );
};

export default ListPage;
