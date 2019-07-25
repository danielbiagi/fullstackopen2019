import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MostVoted from './MostVoted'
import './index.css';
import * as serviceWorker from './serviceWorker';


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const size = anecdotes.length - 1
    const [selected, setSelected] = useState(Math.floor(Math.random() * size))
    const [votes, setVotes] = useState(Array.apply(null, new Array(size)).map(Number.prototype.valueOf, 0));
    const randAnec = () => {
        const item = Math.floor(Math.random() * size)
        setSelected(item)
    }
    const handleVote = (index) => {
        const arr = [...votes]
        arr[index] += 1
        setVotes(arr)
    }

    return (
        <div>
            <h1>
                Anecdote of the day
            </h1>
            <br />
            {anecdotes[selected]}
            <br />
            has {votes[selected]} votes
            <br />
            <button onClick={() => handleVote(selected)}>vote</button>
            <button onClick={randAnec}>next anecdote</button>
            <br />
            <MostVoted anecdotes={anecdotes} votes={votes} selected={selected} />
        </div >
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
