const Form = (props) => {
  let { handleSubmit, name, setName, number, setNumber } = props;

  function handleNameInput(e) {
    setName(e.target.value);
  }
  function handleNumberInput(e) {
    setNumber(e.target.value);
  }

  return (
    <form>
      <div>
        name: <input value={name} onChange={handleNameInput} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};
export default Form;
