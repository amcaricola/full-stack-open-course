import { useState } from "react";
import Filter from "./components/filter";
import Form from "./components/form";
import ShowContacts from "./components/ShowContacts";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let _alreadyAdded = false;

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        _alreadyAdded = true;
        return;
      }
    });

    if (_alreadyAdded) return;

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} setFilter={setNewFilter} />
      <h2>add a new</h2>
      <Form
        handleSubmit={handleSubmit}
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <ShowContacts persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
