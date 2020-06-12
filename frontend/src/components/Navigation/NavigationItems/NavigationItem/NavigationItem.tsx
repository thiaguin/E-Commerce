import React, { useRef, useEffect } from 'react'
import classes from './NavigatiomItem.module.css'
import Departments from '../Departments'
import Aux from '../../../hoc/Aux'

const NavigationItem = (props) => {
    const icon = props.icon ? <img className={classes.NavigatiomIcon} src={props.icon} alt="icon" /> : null

    return (
        <Aux>
            <div
                ref={props.reference}
                className={classes.NavigationItem}
                onMouseEnter={props.enter}
                onMouseLeave={props.leave}
            >
                {icon}
                {props.item.name}
            </div>
        </Aux>
    )
}

export default NavigationItem
