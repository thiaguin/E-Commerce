import React from 'react'
import classes from './Dialog.module.css'

const dialog = (props) => {
    const welcome = 'Bem-vindo <3'
    return (
        <div className={classes.Dialog}>
            <h1>{welcome}</h1>
            <p onClick={props.click}>Entre ou cadastre-se</p>
        </div>
    )
}

export default dialog
