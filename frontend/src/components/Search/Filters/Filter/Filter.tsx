import React from 'react'
import classes from './Filter.module.css'

const filter = (props) => {
    const className = [classes.Filter]

    props.scroll && className.push(classes.Scroll)

    const items = props.items?.map((element) => {
        return (
            <li onClick={() => props.click(element.id)} key={element.id}>
                {element.name}
            </li>
        )
    })

    return (
        <div className={className.join(' ')}>
            <h4>{props.title}</h4>
            <ul>{items}</ul>
        </div>
    )
}

export default filter
