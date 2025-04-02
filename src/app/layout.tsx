
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoWeather Nexus',
  description: 'Modern dashboard combining weather data, cryptocurrency information, and real-time notifications.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
        <main className="min-h-screen">
          {children}
        </main>
       
        <ToastContainer position="bottom-right" autoClose={5000} />
        
      </body>
    </html>
  );
}