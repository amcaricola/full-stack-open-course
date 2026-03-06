import { useState } from "react";

type statisticData = {
  good: number;
  neutral: number;
  bad: number;
};

const Statistics = ({ data }: { data: statisticData }) => {
  let { good, neutral, bad } = data;

  let all = good + neutral + bad;
  let average = (good - bad) / (good + neutral + bad);
  let positive = (good / (good + neutral + bad)) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad} </p>
      <p>all {all} </p>
      <p>average {average} </p>
      <p>positive {positive} %</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handlerGood = () => {
    let newGood = good + 1;
    setGood(newGood);
  };
  const handlerNeutral = () => {
    let newNeutral = neutral + 1;
    setNeutral(newNeutral);
  };
  const handlerBad = () => {
    let newBad = bad + 1;
    setBad(newBad);
  };

  const data: statisticData = { good, neutral, bad };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={handlerGood}>good</button>
        <button onClick={handlerNeutral}>neutral</button>
        <button onClick={handlerBad}>bad</button>
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics data={data} />
      </div>
    </>
  );
};

export default App;
