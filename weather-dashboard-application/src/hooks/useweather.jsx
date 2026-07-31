import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName, controller) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
        controller ? { signal: controller.signal } : {},
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError("❌ City not found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("⚠️ Something went wrong!");
        setWeather(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!city) return;
    const controller = new AbortController();
    fetchWeather(city, controller);
    return () => controller.abort();
  }, [city]);

  useEffect(() => {
    if (!city) return;
    const interval = setInterval(() => {
      fetchWeather(city);
    }, 5000);
    return () => clearInterval(interval);
  }, [city]);
  return { weather, loading, error };
};

export default useWeather;
