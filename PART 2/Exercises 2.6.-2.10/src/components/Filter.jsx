const Filter = ({ filter, setFilter }) => {
  function handleFitlerInput(e) {
    setFilter(e.target.value);
  }

  return (
    <div>
      filter shown with:
      <input value={filter} onChange={handleFitlerInput} />
    </div>
  );
};
export default Filter;
