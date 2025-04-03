"use client";

import { useState } from "react";
import Link from "next/link";

export default function WeatherList() {
  const [cities] = useState(["New York", "London", "Tokyo"]); // Static city list

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <svg 
          className="w-6 h-6 mr-2 text-blue-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
          />
        </svg>
        Weather Dashboard
      </h2>
      <ul className="space-y-3">
        {cities.map((city) => (
          <li key={city}>
            <Link 
              href={`/weather/${encodeURIComponent(city)}`}
              className="group flex items-center p-3 rounded-lg hover:bg-white transition-all duration-300 ease-in-out hover:shadow-md border border-transparent hover:border-blue-100"
            >
              <span className="flex-1 text-gray-700 group-hover:text-blue-600 font-medium">
                {city}
              </span>
              <span className="text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform duration-300">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}