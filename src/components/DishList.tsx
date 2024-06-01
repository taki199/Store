"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchDishByIdAsync } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import { Dish } from '../types';

const DishList: React.FC = () => {
  const dishes = useAppSelector((state) => state.category.dishesByCategory);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = async (dish: Dish) => {
    try {
      const slug = `${dish.name.toLowerCase().replace(/\s+/g, '-')}-${dish._id}`;
      await router.push(`/${slug}`); // Navigate to the dynamic product page with the correct slug
      dispatch(fetchDishByIdAsync(dish._id)); // Fetch the product data based on the product ID
    } catch (error) {
      console.error('Error navigating to product page:', error);
    }
  };

  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      {dishes.map((dish: Dish) => (
        <div key={dish._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
          <div onClick={() => handleClick(dish)} className='cursor-pointer'>
            <div className='relative w-full h-80'>
              {dish.image && (
                <Image
                  src={dish.image.url}
                  alt={dish.name}
                  fill
                  sizes='25vw'
                  className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500'
                />
              )}
              <Image
                src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
                alt={dish.name}
                fill
                sizes='25vw'
                className='absolute object-cover rounded-md'
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium'>{dish.name}</span>
            <span className='font-semibold'>${dish.price}</span>
          </div>
          <div className='text-sm text-gray-500'>{dish.description}</div>
          <button
            className='rounded-2xl ring-1 ring-err text-err w-max py-2 px-4 text-xs hover:bg-err hover:text-white'
            onClick={() => dispatch(addToCart(dish))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default DishList;
