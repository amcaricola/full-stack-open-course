import { useState } from 'react';

type statisticData = {
    good: number;
    neutral: number;
    bad: number;
};

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }: { text: string; value: number }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
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
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive} />
                </tbody>
            </table>
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
                <Button text="good" onClick={handlerGood} />
                <Button text="neutral" onClick={handlerNeutral} />
                <Button text="bad" onClick={handlerBad} />
            </div>
            <h1>statistics</h1>
            <div>
                <Statistics data={data} />
            </div>
        </>
    );
};

export default App;
