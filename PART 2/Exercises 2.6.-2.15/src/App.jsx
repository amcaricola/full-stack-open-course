import { useState, useEffect } from 'react';
import personsServices from './services/persons';
import Filter from './components/filter';
import Form from './components/form';
import ShowContacts from './components/ShowContacts';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newFilter, setNewFilter] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [update, setUpdate] = useState({ willUpdate: false, id: '' });

    useEffect(() => {
        personsServices
            .getAll()
            .then((personsAll) => {
                setPersons(persons.concat(personsAll));
            })
            .catch((error) => {
                alert('Something went wrong');
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        let _alreadyAdded = false;
        if (newName === '' || newNumber === '') {
            alert('Name and number are required');
            return;
        }

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
                alert('error at adding new person ' + newName);
            });
        setNewName('');
        setNewNumber('');
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
            })
            .catch((error) => {
                alert('error at updating person ' + newName);
            });
        setUpdate({ willUpdate: false, id: '' });
        setNewName('');
        setNewNumber('');
    }

    function handleDelete(personId) {
        var personSelected = persons.find((person) => person.id === personId);

        var confirmation = confirm('Delete ' + personSelected.name + ' ?');

        if (confirmation) {
            personsServices
                .deletePerson(personId)
                .then(() => {
                    setPersons(
                        persons.filter((person) => person.id !== personId),
                    );
                })
                .catch((error) => {
                    alert('error at deleting person ' + personSelected.name);
                });
        }
        // console.log("click - id: ", personId, confirmation);
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
