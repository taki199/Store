"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { fetchDishes } from '../api/Dishes'; // Adjust this import based on your actual file structure

const ProductImages = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg",
    },
    {
      id: 2,
      url: "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg",
    },
    {
      id: 3,
      url: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
    },
    {
      id: 4,
      url: "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg",
    },
  ]);

  useEffect(() => {
    const fetchAndAddMainImage = async () => {
      try {
        const dishes = await fetchDishes();
        if (dishes && dishes.length > 0 && dishes[0].image) {
          const mainImage = dishes[0].image.url; // Get the main image URL from the first dish
          setImages((prevImages) => [{ id: 0, url: mainImage }, ...prevImages]);
        }
      } catch (error) {
        console.error("Failed to fetch product image:", error);
      }
    };

    fetchAndAddMainImage();
  }, []);

  return (
    <div className="">
      <div className="h-[500px] relative">
        {images[index] && (
          <Image
            src={images[index].url}
            alt={`Product image ${index + 1}`}
            fill
            sizes="50vw"
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((item, i) => (
          <div
            className="w-1/4 h-32 relative cursor-pointer"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.url}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
