"use client";

import Image from 'next/image';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, clearCart } from '../features/cartSlice';

const CartModal: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ _id: id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20'>
      {cartItems.length === 0 ? (
        <div className=''>Cart is Empty</div>
      ) : (
        <>
          <h2 className='text-xl'>Shopping Cart</h2>
          <div className='flex flex-col gap-8'>
            {cartItems.map((item) => (
              <div key={item._id} className='flex gap-4'>
                <Image src={item.image.url} alt={item.name} width={72} height={96} className='object-cover rounded-md' />
                <div className='flex flex-col justify-between w-full'>
                  <div className=''>
                    <div className='flex items-center justify-between gap-8'>
                      <h3 className='font-semibold'>{item.name}</h3>
                      <div className='p-1 bg-gray-50 rounded-sm'>${item.price}</div>
                    </div>
                    <div className='text-sm text-gray-500'>
                      {item.description}
                    </div>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Qty. {item.quantity}</span>
                    <span className='text-blue-500 cursor-pointer' onClick={() => handleRemove(item._id)}>Remove</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=''>
            <div className='flex items-center justify-between font-semibold'>
              <span className=''>Subtotal</span>
              <span className=''>${total}</span>
            </div>
            <p className='text-gray-500 text-sm mt-2 mb-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className='flex justify-between text-sm'>
              <button className='rounded-md py-3 px-4 ring-1 ring-gray-300' onClick={handleClearCart}>Clear Cart</button>
              <button className='rounded-md py-3 px-4 bg-[#28AF61] text-white disabled:cursor-not-allowed disabled:opacity-75'>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartModal;
