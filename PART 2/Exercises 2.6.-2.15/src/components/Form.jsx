const Form = (props) => {
    let {
        handleSubmit,
        name,
        setName,
        number,
        setNumber,
        update,
        handleUpdate,
    } = props;

    function handleNameInput(e) {
        setName(e.target.value);
    }
    function handleNumberInput(e) {
        setNumber(e.target.value);
    }
    var { willUpdate } = update;

    return (
        <form>
            <div>
                name: <input value={name} onChange={handleNameInput} />
            </div>
            <div>
                number: <input value={number} onChange={handleNumberInput} />
            </div>
            <div>
                {!willUpdate ? (
                    <button type="submit" onClick={handleSubmit}>
                        add
                    </button>
                ) : (
                    <button type="submit" onClick={handleUpdate}>
                        Change
                    </button>
                )}
            </div>
        </form>
    );
};
export default Form;
