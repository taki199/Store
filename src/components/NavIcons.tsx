"use client";

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from 'react-redux';
import CartModal from "./CartModal";
import { RootState } from '../store';

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  // Get cart item count from Redux state
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);

  const isLoggedIn = false; // Replace with actual authentication check

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  return (
    <div className='flex items-center gap-4 xl:gap-6 relative'>
      <Image 
        src="/profile.png" 
        alt='Profile' 
        width={22} 
        height={22} 
        className='cursor-pointer' 
        onClick={handleProfile} 
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={() => {/* Implement logout logic */}}>
            Logout
          </div>
        </div>
      )}
      
      <Image 
        src="/notification.png" 
        alt='Notifications' 
        width={22} 
        height={22} 
        className='cursor-pointer' 
      />
      <div className="relative cursor-pointer" onClick={() => setIsCartOpen((prev) => !prev)}>
        <Image 
          src="/cart.png" 
          alt='Cart' 
          width={22} 
          height={22} 
          className='cursor-pointer' 
        />
        {cartItemsCount > 0 && (
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#28AF61] rounded-full text-white text-sm flex items-center justify-center">
            {cartItemsCount}
          </div>
        )}
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}

export default NavIcons;
