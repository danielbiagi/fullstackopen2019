import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button'
import Statistics from './Statistics'
import * as serviceWorker from './serviceWorker';
import './index.css';

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGood} text="good" />
            <Button onClick={handleNeutral} text="neutral" />
            <Button onClick={handleBad} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} /><br />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
