import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (country) => {
    const apikey = import.meta.env.VITE_SOME_KEY;
    console.log(apikey);
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    try {
      const response = await axios.get(url);
      const weatherData = response.data;
      return weatherData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await fetchWeatherData(country);
      setWeatherData(weatherData);
    };
    fetchWeather();
  }, [country]);

  // Louding
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weatherData && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature: {(weatherData.main?.temp - 273.15).toFixed(2)} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
            alt={weatherData.weather[0]?.description}
          />

          <p>Wind: {weatherData.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
};
export default CountryDetails;
