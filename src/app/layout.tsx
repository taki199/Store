// app/layout.tsx
"use client"
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
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
