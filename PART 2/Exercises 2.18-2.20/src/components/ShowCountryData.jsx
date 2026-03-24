const ShowCountryData = ({ countries }) => {
  if (countries.length != 1) return null;

  const countrySelected = countries[0];
  const languages = Object.values(countrySelected.languages);

  // console.log(countrySelected);

  return (
    <div>
      <h1>{countrySelected.name.common}</h1>
      <p>CAPITAL: {countrySelected.capital}</p>
      <p>AREA: {countrySelected.area}</p>
      <h1>Languages</h1>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={countrySelected.flags.png} alt="flag" />
    </div>
  );
};
export default ShowCountryData;
