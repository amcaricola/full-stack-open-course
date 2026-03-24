import axios from "axios";

const getAllCountries = async () => {
  const response = await axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all",
  );
  return response.data;
};

export default { getAllCountries };
