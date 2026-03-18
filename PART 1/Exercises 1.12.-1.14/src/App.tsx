import { useState } from 'react';

const MostVotedAnecdote = ({
    anecdotes,
    votes,
}: {
    anecdotes: string[];
    votes: Record<number, number>;
}) => {
    let maxVotedIndex = 0;
    for (let key in votes) {
        if (votes[key] > votes[maxVotedIndex]) {
            maxVotedIndex = Number(key);
        }
    }
    if (votes[maxVotedIndex] === 0 || votes[maxVotedIndex] === undefined) {
        return <div>No votes yet</div>;
    }
    return (
        <>
            <div>{anecdotes[maxVotedIndex]}</div>
            <div>has {votes[maxVotedIndex]} votes</div>
        </>
    );
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState<Record<number, number>>({});

    const handleNextAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    };

    const handleVote = (key: number) => {
        let newVote: number = votes[key] ? votes[key] + 1 : 1;
        setVotes({ ...votes, [key]: newVote });
    };

    return (
        <>
            <h1>Anecdote of the Day</h1>
            <div>{anecdotes[selected]}</div>
            <div>has {votes[selected] || 0} votes</div>
            <button onClick={() => handleVote(selected)}>vote</button>
            <button onClick={handleNextAnecdote}>Next Anecdote</button>
            <h1>Anecdote with most votes</h1>
            <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
        </>
    );
};

export default App;
