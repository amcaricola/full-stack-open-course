const ShowContacts = ({ persons, filter = '', deleteEvent, updateEvent }) => {
    let filerByPersons =
        filter != ''
            ? persons.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(filter.toLowerCase());
              })
            : persons;

    return (
        <div>
            {filerByPersons.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => updateEvent(person.id)}>
                        Update
                    </button>
                    <button onClick={() => deleteEvent(person.id)}>
                        delete
                    </button>
                </p>
            ))}
        </div>
    );
};
export default ShowContacts;
