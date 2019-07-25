import React from 'react'

const Part = (props) => {
    return (
        <>
            <i>{props.description}</i>
            <br />
            Exercises: {props.exercises}
            <br />
            <br />
        </>
    )
}

export default Part