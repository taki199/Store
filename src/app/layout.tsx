"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Provider } from 'react-redux';
import store from '../store';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { getCurrentUser } from '../features/authSlice';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'LunchTab',
//   description: 'Find out Lunch whenever You are in Casablanca Morocco',
// };

const InitApp = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return <>{children}</>;
};

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
