import React from 'react'
import classes from './ToolbarItem.module.css'

const toolbarItem = (props) => {
    return (
        <div className={classes.ToolbarItem} onClick={props.click}>
            <img src={props.icon} alt="icon" />
        </div>
    )
}

export default toolbarItem
