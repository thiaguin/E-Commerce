import React from 'react'
import classes from './Filter.module.css'
import xSvg from '../../../../assets/x.svg'

const filter = (props) => {
    const className = [classes.Filter]

    props.scroll && className.push(classes.Scroll)
    props.selected && className.push(classes.Selected)

    const items = props.items?.map((element) => {
        return (
            <li onClick={() => props.click(element)} key={element.id}>
                {element.name}
                {props.selected && <img src={xSvg} alt="x" />}
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
