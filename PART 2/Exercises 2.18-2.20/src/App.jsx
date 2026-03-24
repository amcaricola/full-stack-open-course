import { useState, useEffect } from "react";
import ShowCountries from "./components/ShowCountries.jsx";
import countriesService from "./services/countries";
import ShowCountryData from "./components/ShowCountryData.jsx";
import ShowCountryWeather from "./components/showCountryWeather.jsx";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    if (countries.length === 0) {
      countriesService
        .getAllCountries()
        .then((allContries) => {
          setCountries(allContries);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleFilter(e) {
    setNewFilter(e.target.value);
  }

  function handleSelected(CountryName) {
    setNewFilter(CountryName);
  }

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()),
  );

  return (
    <>
      <h1>Country List</h1>
      <div>
        find countries:
        <input value={newFilter} onChange={handleFilter} />
      </div>

      {countriesToShow.length !== 1 ? (
        <ShowCountries
          countries={countriesToShow}
          handleShowBtn={handleSelected}
        />
      ) : (
        <>
          <ShowCountryData countries={countriesToShow} />
          <ShowCountryWeather countries={countriesToShow} />
        </>
      )}
    </>
  );
};

export default App;
