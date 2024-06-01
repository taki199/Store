// import Add from '@/components/Add';
// import CustomizeProducts from '@/components/CustomizeProducts';
// import ProductImages from '@/components/ProductImages';
// import React from 'react';
// import { Dish } from '../types'; // Adjust the import according to your actual type location

// interface SinglePageProps {
//   product: Dish;
// }

// const SinglePage: React.FC<SinglePageProps> = ({ product }) => {
//   return (
//     <div className='px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
//       {/* IMG */}
//       <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
//         <ProductImages images={product.image.url} /> {/* Pass product images to the component */}
//       </div>
//       {/* Text */}
//       <div className='w-full lg:w-1/2 flex flex-col gap-6'>
//         <h1 className='text-4xl font-medium'>{product.name}</h1>
//         <p className='text-gray-500'>{product.description}</p>
//         <div className='h-[2px] bg-gray-100' />
//         <div className='flex items-center gap-4'>
//           {product.price && <h3 className='text-xl text-gray-500 line-through'>${product.price}</h3>}
//           <h2 className='font-medium text-2xl'>${product.price}</h2>
//         </div>
//         <div className='h-[2px] bg-gray-100' />
//         <CustomizeProducts options={[]} /> {/* Pass empty array for options */}
//         <Add product={product} /> {/* Pass the entire product to the Add component */}
//         <div className='h-[2px] bg-gray-100' />
//         {/* Static content for ingredients */}
//         <div className='text-sm'>
//           <h4 className='font-medium mb-4'>Ingredients</h4>
//           <p>Ingredient 1</p>
//           <p>Ingredient 2</p>
//           <p>Ingredient 3</p>
//         </div>
//         {/* Static content for availability schedule */}
//         <div className='text-sm'>
//           <h4 className='font-medium mb-4'>Availability Schedule</h4>
//           <p>Monday - Friday</p>
//           <p>9:00 AM - 5:00 PM</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SinglePage;
// components/SinglePage.tsx
// components/SinglePage.tsx
import React from 'react';
import { Dish } from '../types';
import ProductImages from './ProductImages';
import Add from '@/components/Add';

interface SinglePageProps {
  product: Dish;
}

const SinglePage: React.FC<SinglePageProps> = ({ product }) => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 pt-20 relative flex flex-col lg:flex-row gap-16'>
      {/* IMG */}
      <div className='w-full lg:w-1/2 lg:sticky top-20 h-max'>
        <ProductImages imageUrl={product.image.url} />
      </div>
      {/* Text */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        <h1 className='text-4xl font-medium'>{product.name}</h1>
        <p className='text-gray-500'>{product.description}</p>
        {/* Price */}
        <div className='flex items-center gap-4'>
          {product.price && <h3 className='text-xl text-gray-500 line-through'>${product.price}</h3>}
          <h2 className='font-medium text-2xl'>${product.price}</h2>
        </div>
        {/* Add to Cart button */}
        <div className='mt-4'>
          <Add productId={product._id!} />
        </div>
        {/* Other details */}
      </div>
    </div>
  );
};

export default SinglePage;



