import React from 'react'

const Total = (props) => {
    const part = props.parts
    let total = 0;

    part.forEach(element => total += element.exercises);

    return (
        <>
            <h3>Total of exercises: {total}</h3>
        </>
    )
}

export default Total