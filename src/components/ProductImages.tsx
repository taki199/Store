// components/ProductImages.tsx
import Image from 'next/image';
import React from 'react';

interface ProductImagesProps {
  imageUrl: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ imageUrl }) => {
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={imageUrl}
          alt="Product image"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductImages;
