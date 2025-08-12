import React, { useState, useEffect } from "react";
import styles from "./hero.module.css";

const Hero = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c"; // Note: Move to environment variable in production

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("You must enter a city.");
      setWeather(null);
      return;
    }

    setError("");
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        city
      )}&appid=${apiKey}&units=metric&lang=pt_br`;
      const response = await fetch(apiUrl);
      const json = await response.json();

      if (json.cod === 200) {
        setWeather({
          city: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempMax: json.main.temp_max,
          tempMin: json.main.temp_min,
          description: json.weather[0].description,
          tempIcon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          humidity: json.main.humidity,
        });
      } else {
        setWeather(null);
        setError(`
          City not found.
        `);
      }
    } catch (error) {
      setWeather(null);
      console.error("Error:", error);
      setError("Error to get the weather. Please try again.");
    }

    setCity("");
  };

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setBackgroundImage("/images/morning.jpg"); // manhã
    } else if (hour >= 12 && hour < 18) {
      setBackgroundImage("/images/afternoon.jpg"); // tarde
    } else {
      setBackgroundImage("/images/night.jpg"); // noite
    }
  }, []);
  return (
    <section
      className={styles.Hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.wrapperHero}>
        <div className={styles.contentHero}>
          <h1 className={styles.heroTitle}>A cosmic view of today’s weather</h1>
        </div>
        <form className={styles.searchBar} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <span>→</span>
          </button>
        </form>
        {error && (
          <div
            id="alert"
            className={styles.alert}
            dangerouslySetInnerHTML={{ __html: error }}
          />
        )}
        {weather && (
          <div id="weather" className={`${styles.weather} show`}>
            <h2 id="title">
              {weather.city}, {weather.country}
            </h2>
            <div id="temp_value">
              {weather.temp.toFixed(1).toString().replace(".", ",")}{" "}
              <sup>C°</sup>
            </div>
            <div id="temp_description">{weather.description}</div>
            <img
              id="temp_img"
              src={`https://openweathermap.org/img/wn/${weather.tempIcon}@2x.png`}
              alt="Weather icon"
            />
            <div id="temp_max">
              Max: {weather.tempMax.toFixed(1).toString().replace(".", ",")}{" "}
              <sup>C°</sup>
            </div>
            <div id="temp_min">
              Min: {weather.tempMin.toFixed(1).toString().replace(".", ",")}{" "}
              <sup>C°</sup>
            </div>
            <div id="humidity">Humidity: {weather.humidity}%</div>
            <div id="wind">Wind: {weather.windSpeed.toFixed(1)}km/h</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
