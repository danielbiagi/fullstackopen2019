import React, { useState } from 'react';

const MostVoted = (props) => {
    const anecdotes = props.anecdotes
    const selected = props.selected
    const votes = props.votes
    const [max, setMax] = useState(selected)
    const [maxVotes, setMaxVotes] = useState(votes[selected])

    const size = anecdotes.length
    for (let i = 0; i <= size; i++) {
        if (votes[i] > maxVotes) {
            setMax(i)
            setMaxVotes(votes[i])
        }
    }

    return (
        <div>
            <h1>
                Anecdote with most votes
            </h1>
            <br />
            {anecdotes[max]}
            <br />
            has {maxVotes} votes
        </div>
    )
}


export default MostVoted