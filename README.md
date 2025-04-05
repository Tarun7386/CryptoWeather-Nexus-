# 🌤️💸 CryptoWeather Nexus

**CryptoWeather Nexus** is a modern, responsive dashboard that fuses **real-time cryptocurrency data** with **weather information** for global cities. Get current conditions, price alerts, historical charts, and breaking crypto news — all in one place.

---

## 🖼️ Preview

![CryptoWeather Nexus Dashboard](./public/dashboard.png)

---

## 🚀 Features

- 🔴 **Live BTC & ETH price updates** via WebSocket
- 🌤️ **Current weather & 5-day forecast** for New York, London, Tokyo
- 📈 **Weather history** with Chart.js and data table
- 📢 **Real-time alerts** for crypto price spikes or simulated weather events
- 📰 **Top 5 crypto news headlines** via NewsData.io
- 🏙️ **City detail pages** with charts, forecasts, and historical weather
- 🌐 **Responsive UI** with Tailwind CSS + animations
- ⚙️ Built using the latest **Next.js App Router architecture**

---

## 🛠️ Tech Stack

| Layer              | Technology                                    |
|-------------------|-----------------------------------------------|
| **Framework**      | [Next.js (App Router)](https://nextjs.org/)   |
| **Language**       | TypeScript                                     |
| **Styling**        | Tailwind CSS                                   |
| **State Management** | Redux Toolkit + React-Redux                  |
| **Data Fetching**  | Axios                                          |
| **Charts**         | Chart.js                                       |
| **WebSocket**      | CoinCap for crypto prices |
| **APIs**           | OpenWeatherMap, CoinCap, NewsData.io          |
| **Deployment**     | Vercel                                         |

---

---

## 🌐 APIs Used

| API              | Purpose                                 |
|------------------|------------------------------------------|
| **OpenWeatherMap** | Current weather, forecast, history     |
| **CoinCap WebSocket** | Live BTC/ETH price streaming        |
| **NewsData.io**     | Top 5 crypto headlines                |

---

## 🔑 Environment Variables

Create a `.env.local` file in the root:

```env
WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key
```

---
### 🧪 Getting Started (Local Development)

1. Clone the repo
```
  git clone https://github.com/yourusername/CryptoWeather-Nexus.git
  cd CryptoWeather-Nexus
```
2. Install dependencies
```
  npm install
```
3.  Add .env.local
```
  touch .env.local
```
Then paste your API keys
4.Run the dev server
```
  npm run dev  
```
 Visit http://localhost:3000 to see it live.



   


  

