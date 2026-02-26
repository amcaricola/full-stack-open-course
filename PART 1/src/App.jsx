const Header = ({ title }) => {
  return <h1>{title}</h1>;
};
const Content = ({ all_parts_data }) => {
  return (
    <>
      <Part info={all_parts_data[0]} />
      <Part info={all_parts_data[1]} />
      <Part info={all_parts_data[2]} />
    </>
  );
};

const Part = ({ info: [part, exercises] }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Total = ({ totalData }) => {
  return <p>Number of exercises {totalData}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  let all_parts = [];
  all_parts.push([part1, exercises1]);
  all_parts.push([part2, exercises2]);
  all_parts.push([part3, exercises3]);
  let total_exercises = exercises1 + exercises2 + exercises3;
  return (
    <>
      <Header title={course} />
      <Content all_parts_data={all_parts} />
      <Total totalData={total_exercises} />
    </>
  );
};

export default App;
