import { useEffect, useState } from "react";
import styles from "./topcountries.module.css";

const WorldWeather = () => {
  const [citiesWeather, setCitiesWeather] = useState([]);

  const cities = [
    { city: "New York", countryCode: "us" },
    { city: "Tokyo", countryCode: "jp" },
    { city: "Madrid", countryCode: "es" },
    { city: "Paris", countryCode: "fr" },
    { city: "Rio de Janeiro", countryCode: "br" },
    { city: "London", countryCode: "gb" },
    { city: "Sydney", countryCode: "au" },
  ];

  useEffect(() => {
    const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
    const fetchWeather = async () => {
      const data = await Promise.all(
        cities.map(async ({ city, countryCode }) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          const json = await res.json();
          return {
            city: city,
            countryCode: countryCode,
            temperature: Math.round(json.main.temp),
            weatherIcon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
            description: json.weather[0].description,
          };
        })
      );
      setCitiesWeather(data);
    };
    fetchWeather();
  });

  return (
    <section className={styles.worldWeatherSection}>
      <h2 className={styles.worldWeatherTitle}>World Weather</h2>
      <div className={styles.worldWeather}>
        {citiesWeather.map((item, index) => (
          <div className={styles.cityCard} key={index}>
            <div className={styles.flagContainer}>
              <img
                src={`https://flagcdn.com/w40/${item.countryCode}.png`}
                alt={`${item.city} flag`}
                className={styles.countryFlag}
              />
            </div>
            <h3>{item.city}</h3>
            <p>{item.temperature}°C</p>
            <img
              src={item.weatherIcon}
              alt="Weather Icon"
              className={styles.weatherIcon}
            />
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorldWeather;
