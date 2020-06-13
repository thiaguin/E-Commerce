import React from 'react'
import classes from './NavigatiomItem.module.css'

const NavigationItem = (props) => {
    const icon = props.icon ? <img className={classes.NavigatiomIcon} src={props.icon} alt="icon" /> : null

    return (
        <div className={classes.NavigationItem}>
            {icon}
            {props.item.name}
        </div>
    )
}

export default NavigationItem
