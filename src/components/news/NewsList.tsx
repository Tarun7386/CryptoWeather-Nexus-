"use client";

import { useEffect, useState } from "react";
import { newsApi } from "@/lib/newsApi";

interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
}

export default function CryptoNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getCryptoNews();
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg border border-purple-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <svg 
          className="w-6 h-6 mr-2 text-purple-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" 
          />
        </svg>
        Crypto News
      </h2>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <ul className="space-y-4">
          {news.map((article, index) => (
            <li 
              key={index} 
              className="group relative bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-purple-50 
                         hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
              >
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 
                             transition-colors duration-200">
                  {article.title}
                </h3>
                
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <svg 
                    className="w-4 h-4 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  {new Date(article.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>

                {article.description && (
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                )}

                <span className="absolute inset-0 rounded-lg border-2 border-transparent 
                               group-hover:border-purple-200 transition-all duration-300 pointer-events-none">
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}