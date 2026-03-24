import { useState, useEffect } from "react";
import personsServices from "./services/persons";
import Filter from "./components/filter";
import Form from "./components/form";
import ShowContacts from "./components/ShowContacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [update, setUpdate] = useState({ willUpdate: false, id: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsServices
      .getAll()
      .then((personsAll) => {
        setPersons(persons.concat(personsAll));
      })
      .catch((error) => {
        setNotification({ text: "Something went wrong", color: "red" });
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let _alreadyAdded = false;
    if (newName === "" || newNumber === "") {
      setNotification({ text: "Name and number are required", color: "red" });
      return;
    }

    persons.forEach((person) => {
      if (person.name === newName) {
        setNotification({
          text: `${newName} is already added to phonebook`,
          color: "red",
        });
        _alreadyAdded = true;
        return;
      }
    });
    if (_alreadyAdded) return;
    personsServices
      .createPerson({ name: newName, number: newNumber })
      .then((newPersonToAdd) => {
        setPersons(persons.concat(newPersonToAdd));
        setNotification({
          text: newName + " Added",
          color: "green",
        });
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotification({
          text: "error at adding new person " + newName,
          color: "red",
        });
      });
  }

  function updateEvent(personId) {
    var personSelected = persons.find((person) => person.id === personId);
    setUpdate({ willUpdate: true, id: personSelected.id });
    setNewName(personSelected.name);
    setNewNumber(personSelected.number);
  }

  function handleUpdate(e) {
    e.preventDefault();
    personsServices
      .updatePerson(update.id, {
        name: newName,
        number: newNumber,
      })
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === update.id ? updatedPerson : person,
          ),
        );
        setUpdate({ willUpdate: false, id: "" });
        setNewName("");
        setNewNumber("");
        setNotification({
          text: newName + " updated",
          color: "green",
        });
      })
      .catch((error) => {
        setNotification({
          text: "error at updating person " + newName,
          color: "red",
        });
      });
  }

  function handleDelete(personId) {
    var personSelected = persons.find((person) => person.id === personId);

    var confirmation = confirm("Delete " + personSelected.name + " ?");

    if (confirmation) {
      personsServices
        .deletePerson(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personId));
          setNotification({
            text: personSelected.name + " Deleted",
            color: "green",
          });
        })
        .catch((error) => {
          setNotification({
            text: "error at deleting person " + personSelected.name,
            color: "red",
          });
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification Message={notification} setMessage={setNotification} />
      <Filter filter={newFilter} setFilter={setNewFilter} />
      {!update.willUpdate ? <h2>add a new</h2> : <h2>update contact</h2>}
      <Form
        handleSubmit={handleSubmit}
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
        update={update}
        handleUpdate={handleUpdate}
      />
      <h2>Numbers</h2>
      <ShowContacts
        persons={persons}
        filter={newFilter}
        deleteEvent={handleDelete}
        updateEvent={updateEvent}
      />
    </div>
  );
};

export default App;
