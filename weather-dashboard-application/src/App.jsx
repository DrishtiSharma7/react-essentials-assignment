import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./weatherCard";
import { Search } from "lucide-react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
          setError("❌ City not found!");
          setWeather(null);
        } else {
          setWeather(data);
        }
      } catch (err) {
        setError("⚠️ Something went wrong!");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
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
          />
        </div>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && (
        <p className="loading-text">
          Loading...
        </p>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      <div className="weather-container">
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
}

export default App;