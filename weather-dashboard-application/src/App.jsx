import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./weatherCard";
import { Search } from "lucide-react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

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

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();

    fetchWeather(city, controller);

    return () => {
      controller.abort();
    };
  }, [city]);

  useEffect(() => {
    if (!city) return;

    const interval = setInterval(() => {
      console.log("Auto Refresh Triggered");
      fetchWeather(city);
    }, 5000);

    return () => clearInterval(interval);
  }, [city]);

  useEffect(() => {
    document.title = city ? `Weather - ${city}` : "Weather Dashboard";
  }, [city]);

  return (
    <div className="app">
      <h1 className="heading">Weather Dashboard</h1>

      <div className="search-container">
        <div className="search-input">
          <Search className="search-icon" />
          <input
            className="search-input-field"
            type="text"
            placeholder="Search for a city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p className="loading-text">Loading weather data...</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="weather-container">
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
}

export default App;
