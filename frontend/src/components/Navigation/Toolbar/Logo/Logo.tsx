import React from 'react'
import logoIcon from '../../../../assets/logo.png'
import classes from './Logo.module.css'
import { useHistory } from 'react-router-dom'

const Logo = (props) => {
    const history = useHistory()

    const logoClickHandler = () => {
        history.push('/')
    }

    return (
        <div className={classes.Logo} onClick={logoClickHandler}>
            <img src={logoIcon} alt="icon"></img>
        </div>
    )
}

export default Logo
