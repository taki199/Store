"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchDishByIdAsync } from '../../features/productsSlice';
import SinglePage from '../../components/SinglePage';
import { Dish } from '../../types/index';
import Loader from '../../components/Loader';

const DynamicProductPage = () => {
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/').pop() : undefined;
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Dish | null>(null);

  const isLoading = useAppSelector((state) => state.products.status === 'loading');

  useEffect(() => {
    const fetchProduct = async () => {
      if (slug) {
        const productId = slug.split('-').pop(); // Get the product ID from the slug
        const productData = await dispatch(fetchDishByIdAsync(productId ?? ''));
        if (productData.payload) {
          setProduct(productData.payload as Dish); // Cast the payload to Dish
        } else {
          // Handle case where product is not found
          console.error('Product not found');
        }
      }
    };
    fetchProduct();
  }, [slug, dispatch]);

  if (isLoading || product === null) {
    return <div>
      <Loader />
    </div>;
  }

  return <SinglePage product={product} />;
};

export default DynamicProductPage;
