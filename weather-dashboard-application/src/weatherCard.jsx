import React from "react";
import "./weatherCard.css";
import { Droplet, Star, Thermometer, Wind } from "lucide-react";
import { Skeleton } from "boneyard-js/react";

function WeatherCard({ weather, loading }) {
  if (!weather && !loading) {
    return (
      <p style={{ color: "gray", padding: "1rem" }}>
        Search a city to get weather!
      </p>
    );
  }

  const getWeatherIcon = (condition = "") => {
    condition = condition.toLowerCase();

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
      <h2 className="city-name">
        {loading ? <Skeleton width={150} height={30} /> : weather.name}
      </h2>

      <div className="weather-icon-container">
        {loading ? (
          <Skeleton width={80} height={80} />
        ) : (
          getWeatherIcon(weather.weather[0].description)
        )}
      </div>

      <div className="weather-details-grid">
        <div className="detail-item">
          <span className="detail-label">
            <Thermometer color="orange" /> Temperature
          </span>
          <span className="detail-value">
            {loading ? <Skeleton width={70} /> : `${weather.main.temp}°C`}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">
            <Droplet color="lightblue" /> Humidity
          </span>
          <span className="detail-value">
            {loading ? <Skeleton width={60} /> : `${weather.main.humidity}%`}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">
            <Wind /> Wind Speed
          </span>
          <span className="detail-value">
            {loading ? <Skeleton width={80} /> : `${weather.wind.speed} m/s`}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">
            <Star color="yellow" /> Condition
          </span>
          <span className="detail-value condition-text">
            {loading ? (
              <Skeleton width={120} />
            ) : (
              weather.weather[0].description
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
