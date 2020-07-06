import React from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import classes from './Header.module.css'

const header = (props) => {
    return (
        <div className={classes.Header}>
            <Toolbar />
            <NavigationItems />
        </div>
    )
}

export default header
