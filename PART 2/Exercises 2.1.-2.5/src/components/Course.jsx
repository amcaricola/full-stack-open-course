const Course = ({ course }) => {
  let { name, parts } = course;
  let execiseSum = parts.reduce((acumulator, item) => {
    return acumulator + item.exercises;
  }, 0);

  return (
    <>
      <h2>{name}</h2>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
      <p>
        <strong>total of {execiseSum} exercises</strong>
      </p>
    </>
  );
};

export default Course;
