import React from 'react'
import classes from './NavigationMultipleItem.module.css'

const NavigationMultipleItem = (props) => {
    const className = props.hover ? classes.NavigationMultipleItemHover : classes.NavigationMultipleItem

    const icon = props.icon ? <img className={classes.NavigatiomIcon} src={props.icon} alt="icon" /> : null

    return (
        <div ref={props.reference} className={className} onMouseEnter={props.enter} onMouseLeave={props.leave}>
            {icon}
            {props.item.title}
        </div>
    )
}

export default NavigationMultipleItem
