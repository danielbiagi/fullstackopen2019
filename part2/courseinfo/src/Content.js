import React from 'react'
import Part from './Part'

const Content = (props) => {
    const part = props.parts

    const rows = () => part.map(p =>
        <Part key={p.id} description={p.name} exercises={p.exercises} />
    )

    return (
        <>
            {rows()}
        </>
    )
}

export default Content