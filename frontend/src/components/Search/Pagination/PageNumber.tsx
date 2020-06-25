import React from 'react'
import classes from './Pagination.module.css'
const pageNumber = (props) => {
    const classname = props.selected ? classes.Selected : undefined
    return (
        <h3 onClick={() => props.click(props.number)} className={classname}>
            {props.number}
        </h3>
    )
}

export default pageNumber
