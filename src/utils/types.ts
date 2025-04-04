// Crypto types
export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    last_updated: string;
  }
  
  export interface CryptoHistoryData {
    prices: [number, number][]; // [timestamp, price]
    market_caps: [number, number][];
    total_volumes: [number, number][];
  }
  
  // Weather types
  export interface WeatherData {
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }
  
  export interface WeatherForecast {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
  }
  
  export interface WeatherState {
    current: Record<string, WeatherData>;
    forecast: Record<string, WeatherForecast[]>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }