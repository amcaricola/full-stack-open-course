const ShowCountries = ({ countries, handleShowBtn }) => {
  // console.log(countriesToShow);

  if (countries.length <= 0) {
    return <p>no countries to show...</p>;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div>
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShowBtn(country.name.common)}>
              Show
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
export default ShowCountries;
