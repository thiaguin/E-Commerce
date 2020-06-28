import React from 'react'
import classes from './ToolbarItem.module.css'

const toolbarItem = (props) => {
    const classesName = [classes.ToolbarItem]
    props.isLogout && classesName.push(classes.Car)

    return (
        <div className={classesName.join(' ')} onClick={props.click}>
            <img src={props.icon} alt="icon" />
        </div>
    )
}

export default toolbarItem
