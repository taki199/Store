"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getCurrentUser } from '../features/authSlice';
import Loader from '../components/Loader';

const InitApp = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser()).finally(() => setLoading(false));
    } else {
      setLoading(false); // No token, no need to fetch user
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Provider } from 'react-redux';
import store from '../store';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'LunchTab',
//   description: 'Find out Lunch whenever You are in Casablanca Morocco',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <InitApp>
            <Navbar />
            {children}
            <Footer />
          </InitApp>
        </Provider>
      </body>
    </html>
  );
}
