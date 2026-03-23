import { useState, useEffect } from "react";
import personsServices from "./services/persons";
import Filter from "./components/filter";
import Form from "./components/form";
import ShowContacts from "./components/ShowContacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personsServices
      .getAll()
      .then((personsAll) => {
        setPersons(persons.concat(personsAll));
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }, []);

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

    personsServices
      .createPerson({ name: newName, number: newNumber })
      .then((newPersonToAdd) => {
        setPersons(persons.concat(newPersonToAdd));
      })
      .catch((error) => {
        alert("error at adding new person " + newName);
      });
    setNewName("");
    setNewNumber("");
  }

  function handleDelete(personId) {
    var personSelected = persons.find((person) => person.id === personId);

    var confirmation = confirm("Delete " + personSelected.name + " ?");

    if (confirmation) {
      personsServices
        .deletePerson(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personId));
        })
        .catch((error) => {
          alert("error at deleting person " + personSelected.name);
        });
    }
    // console.log("click - id: ", personId, confirmation);
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
      <ShowContacts
        persons={persons}
        filter={newFilter}
        deleteEvent={handleDelete}
      />
    </div>
  );
};

export default App;
