import countriesService from "../services/countries";
import { useState } from "react";

const ShowCountryWeather = ({ countries }) => {
  const [weather, setWeather] = useState(null);
  if (countries.length != 1) {
    if (weather) setWeather(null);
    return null;
  }

  const countrySelected = countries[0];
  const [lon, lat] = countrySelected.capitalInfo.latlng;

  function handleShowWeather() {
    countriesService
      .getCountryWeather(lon, lat)
      .then((response) => {
        console.log(response);
        setWeather(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  var Celsius = 0;
  if (weather) {
    Celsius = (weather.main.temp - 32) * 0.55;
    console.log(weather.main.temp);
  }

  return (
    <>
      <h2>Weather in {countrySelected.name.common}</h2>
      {!weather ? (
        <button onClick={handleShowWeather}>Show Weather</button>
      ) : (
        <>
          <p>Temperature {Celsius.toFixed(2)} Celcius</p>
          <p>Wind {weather.wind.speed} M/s</p>
        </>
      )}
    </>
  );
};

export default ShowCountryWeather;
