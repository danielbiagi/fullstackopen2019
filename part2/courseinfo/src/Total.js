import React from 'react'

const Total = (props) => {
    const total = props.parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <>
            <h3>Total of exercises: {total}</h3>
        </>
    )
}

export default Total