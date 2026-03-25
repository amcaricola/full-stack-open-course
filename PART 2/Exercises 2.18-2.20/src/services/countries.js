import axios from 'axios';
import WEATHER_API_KEY from './key';
const OWK = WEATHER_API_KEY;

console.log(OWK);

const getAllCountries = async () => {
    const response = await axios.get(
        'https://studies.cs.helsinki.fi/restcountries/api/all',
    );
    return response.data;
};

const getCountryWeather = async (lat, lon) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWK}&units=metric`;
    const response = await axios.get(URL);
    return response.data;
};

export default { getAllCountries, getCountryWeather };
