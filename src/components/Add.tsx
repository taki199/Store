"use client"

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addToCart } from '../features/cartSlice';
import { RootState } from '../store';

interface AddProps {
  productId: string;
}

const Add: React.FC<AddProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: RootState) =>
    state.products.products.find((product) => product._id === productId)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const stockNumber = product.stock || 0;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= stockNumber) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className='flex items-center gap-4'>
          <div className='bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32'>
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity("d")}>-</button>
            {quantity}
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity("i")}>+</button>
          </div>
          <div className='text-xs'>
            Only <span className='text-orange-500'>{stockNumber} items</span> Left!<br /> Don't miss it
          </div>
        </div>

        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-err text-err py-2 px-4 hover:bg-err hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white"
          onClick={handleAddToCart}
          disabled={quantity > stockNumber}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Add;
