import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import cryptoApi from "@/lib/cryptoApi";

// Define the Crypto type
export interface Crypto {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

// Define the state type
interface CryptoState {
  cryptoData: Crypto[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

// ✅ Properly define initial state with correct type
const initialState: CryptoState = {
  cryptoData: [],
  status: "idle",
};

// Async thunk for fetching crypto data
export const fetchCryptoData = createAsyncThunk<Crypto[]>(
  "crypto/fetchData",
  async () => {
    return await cryptoApi.getMarketData();
  }
);

// Create crypto slice
const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {}, // You can add reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<Crypto[]>) => {
        state.status = "succeeded";
        state.cryptoData = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export the reducer
export default cryptoSlice.reducer;
