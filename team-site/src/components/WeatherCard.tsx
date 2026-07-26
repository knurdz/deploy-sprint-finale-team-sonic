import { useEffect, useState } from "react";

interface WeatherData {
  provider: string;
  configured: boolean;
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  updatedAt: string;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch("/api/weather.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather loading failed:", err);
        setError("Weather information is currently unavailable.");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  if (loading) {
    return (
      <section className="weather-card">
        <p>Loading Colombo weather...</p>
      </section>
    );
  }

  if (error || !weather) {
    return (
      <section className="weather-card">
        <h2>Colombo Weather</h2>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <div>
          <p className="weather-label">Current weather</p>
          <h2>
            {weather.city}, {weather.country}
          </h2>
        </div>

        <span className="weather-provider">OpenWeather</span>
      </div>

      <div className="weather-card-content">
        <p className="weather-temperature">
          {Math.round(weather.temperature)}°C
        </p>

        <div>
          <p className="weather-description">{weather.description}</p>
          <p>Feels like {Math.round(weather.feelsLike)}°C</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      </div>

      <p className="weather-updated">
        Updated: {new Date(weather.updatedAt).toLocaleString()}
      </p>
    </section>
  );
}