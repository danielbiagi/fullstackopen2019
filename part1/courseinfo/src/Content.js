import React from 'react'
import Part from './Part'

const Content = (props) => {
    const part = props.parts
    return (
        <>
            <Part description={part[0].name} exercises={part[0].exercises} />
            <Part description={part[1].name} exercises={part[1].exercises} />
            <Part description={part[2].name} exercises={part[2].exercises} />
        </>
    )
}

export default Content