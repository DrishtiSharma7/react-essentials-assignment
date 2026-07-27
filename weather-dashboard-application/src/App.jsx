import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./weatherCard";
import { Search } from "lucide-react";
import useWeather from "./hooks/useWeather";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("Delhi");
  const { weather, loading, error } = useWeather(city);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

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

      {loading && (
        <p className="loading-text">Loading weather data...</p>
      )}

      {error && <p className="error-text">{error}</p>}
      <div className="weather-container">
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
}

export default App;