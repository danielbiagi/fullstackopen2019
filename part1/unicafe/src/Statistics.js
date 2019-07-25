import React from 'react'
import Statistic from './Statistic'

const Statistics = (stats) => {
    const good = stats.good
    const neutral = stats.neutral
    const bad = stats.bad
    const all = good + neutral + bad
    const average = (good + (bad * -1)) / all
    let pos = (good / all * 100)
    pos = pos.toString().concat("%")
    const positive = pos

    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                No feedback given<br />
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <thead>
                        <tr>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={all} />
                        <Statistic text="average" value={average} />
                        <Statistic text="positive" value={positive} />
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Statistics