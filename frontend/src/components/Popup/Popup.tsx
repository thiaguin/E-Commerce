import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Popup = (props) => {
    const message = {
        NotUnique: 'Já existe um usuário com esse nome\nPor Favor tente outro!',
        NotFound: 'Usuário ou senha inválido',
        ADDED_FAVORITE: 'Você adicionou este produto aos favoritos.',
        REMOVED_FAVORITE: 'Você removeu este produto dos favoritos.',
    }

    const toastValue = props.type ? toast[props.type](message[props.message]) : toast(message[props.message])
    return (
        <div>
            {toastValue}
            <ToastContainer type={props.type} />
        </div>
    )
}

export default Popup
