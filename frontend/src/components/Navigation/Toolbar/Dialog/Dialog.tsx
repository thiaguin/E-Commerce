import React from 'react'
import classes from './Dialog.module.css'
import camelcase from 'camelcase'

const dialog = (props) => {
    let title = 'Bem-vindo <3'
    let link = 'Entre ou cadastre-se'

    if (props.auth?.token) {
        title = `Oi, ${camelcase(props.auth?.username, { pascalCase: true })}`
        link = 'Meus Pedidos'
    }

    return (
        <div className={classes.Dialog}>
            <h1>{title}</h1>
            <p onClick={props.click}>{link}</p>
        </div>
    )
}

export default dialog
