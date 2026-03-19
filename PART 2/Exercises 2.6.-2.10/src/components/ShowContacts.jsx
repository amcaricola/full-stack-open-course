const ShowContacts = ({ persons, filter = "" }) => {
  let filerByPersons =
    filter != ""
      ? persons.filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        })
      : persons;

  return (
    <div>
      {filerByPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
export default ShowContacts;
