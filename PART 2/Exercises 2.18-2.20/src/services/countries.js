import axios from "axios";
const OWK = "b57a18db2771de4845bc26e141852706";

const getAllCountries = async () => {
  const response = await axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all",
  );
  return response.data;
};

const getCountryWeather = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWK}`;
  const response = await axios.get(URL);
  return response.data;
};

export default { getAllCountries, getCountryWeather };
