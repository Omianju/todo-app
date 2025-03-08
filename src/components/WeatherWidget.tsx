import { Cloud, CloudRain, Sun } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchWeather } from "../store/weatherSlice";

export default function WeatherWidget() {
  const dispatch = useDispatch<AppDispatch>();
  const { temperature, condition, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    dispatch(fetchWeather("London"));
  }, [dispatch]);

  if (loading) {
    return <div className="animate-pulse">Loading weather...</div>;
  }

  if (error) {
    return null;
  }

  const getWeatherIcon = () => {
    if (!condition) return <Cloud />;
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes("rain")) return <CloudRain />;
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear"))
      return <Sun />;
    return <Cloud />;
  };

  return (
    <div
      className={`flex items-center space-x-2 ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      {getWeatherIcon()}
      <span>{temperature}°C</span>
    </div>
  );
}
