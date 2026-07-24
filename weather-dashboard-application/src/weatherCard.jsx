import React from "react";
import "./weatherCard.css";
function WeatherCard({ weather }) {
  if (!weather) return <p style={{ color: "gray", padding: "1rem" }}>Search a city to get weather!</p>;
  const getWeatherIcon = (condition) => {
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("clear")) return "☀️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("thunder")) return "⛈️";
    if (condition.includes("mist")) return "🌫️";
    return "🌡️";
  };

  return (
    <div className="weather-card">
      {/* City Title Section */}
      <h2 className="city-name">{weather.name}</h2>

      {/* Weather Icon Center Graphic Container */}
      <div className="weather-icon-container">
        {getWeatherIcon(weather.weather[0].description)}
      </div>

      <div className="weather-details-grid">
        <div className="detail-item">
          <span className="detail-label">🌡️ Temperature</span>
          <span className="detail-value">{weather.main.temp}°C</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">💧 Humidity</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">💨 Wind Speed</span>
          <span className="detail-value">{weather.wind.speed} m/s</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">✨ Condition</span>
          <span className="detail-value condition-text">
            {weather.weather[0].description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
