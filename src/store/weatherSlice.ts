import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { WeatherState } from '../types';




const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
const WEATHER_API_URL = import.meta.env.VITE_APP_WEATHER_API_URL;



export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string = 'London', { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
      );
      return {
        temperature: response.data.current.temp_c,
        condition: response.data.current.condition.text,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data');
    }
  }
);

const initialState: WeatherState = {
  temperature: undefined,
  condition: undefined,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.temperature = action.payload.temperature;
        state.condition = action.payload.condition;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;