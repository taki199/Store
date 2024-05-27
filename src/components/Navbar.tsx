import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

const Navbar = () => {
  return (
    <div className='h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative'>
       {/* Mobile */}
      <div className='h-full flex items-center justify-between md:hidden'>
      <Link href="/">
          <Image src="/laun1.png" alt='Logo' width={100} height={50}/>
      </Link>
      <Menu/>
      </div>  
       {/* Bigger Screens */}
       <div className='hidden md:flex items-center justify-between gap-8 h-full '>
         {/* Left */}
        <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
          <Link href="/" >
          <Image src="/laun1.png" alt='Logo' width={150} height={80}/>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
         {/* right */}
         <div className='w-2/3 xl:w-1/2 flex items-center justify-between gap-8'>
          <SearchBar/>
          <NavIcons/>
         </div>
       </div>
    </div>
  )
}

export default Navbar