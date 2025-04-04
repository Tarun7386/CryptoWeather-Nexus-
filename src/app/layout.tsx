import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/layouts/Header";
// import Footer from '@/components/layouts/Footer';
import "./globals.css";
import { Providers } from "./providers"; // ✅ Import the Providers component

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description: "Modern dashboard combining weather data, cryptocurrency information, and real-time notifications.",
  keywords: ["crypto", "weather", "dashboard", "bitcoin", "ethereum", "forecast"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen pt-16 bg-gray-50">
        <Providers> {/* ✅ Wrap the entire app in Providers */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          {/* <Footer /> */}
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
