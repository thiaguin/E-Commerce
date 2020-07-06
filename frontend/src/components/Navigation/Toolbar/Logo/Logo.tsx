import React from 'react'
import logoIcon from '../../../../assets/logo.png'
import classes from './Logo.module.css'

const Logo = (props) => {
    return (
        <div className={classes.Logo} onClick={props.click}>
            <img src={logoIcon} alt="icon"></img>
        </div>
    )
}

export default Logo
