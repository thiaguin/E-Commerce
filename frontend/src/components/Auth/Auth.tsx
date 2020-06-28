import React, { useEffect, useState } from 'react'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import background from '../../assets/e-commerce.png'
const Auth = (props) => {
    const { onSetIsAuthPage } = props

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const style: React.CSSProperties = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: '115px',
        width: '100%',
        height: '100%',
        position: 'absolute',
    }

    const changeLoginHandler = (event) => {
        setUsername(event.target.value)
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
    }

    const onLoginClickHandler = () => {
        props.onClickLogin({ username, password })
    }

    const onSignupClickHandler = () => {
        props.onClickSignup({ username, password })
    }

    useEffect(() => {
        onSetIsAuthPage(true)
    }, [onSetIsAuthPage])

    return (
        <div style={style}>
            <div className={classes.Auth}>
                <form>
                    <input
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={changeLoginHandler}
                        placeholder="Nome do Usuário"
                    />
                    <input
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={changePasswordHandler}
                        placeholder="Senha"
                    />
                </form>
                <button onClick={onSignupClickHandler} className={classes.Signup}>
                    Cadastre-se
                </button>
                <button onClick={onLoginClickHandler} className={classes.Login}>
                    Login
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetIsAuthPage: (value) => dispatch(actions.setIsAuthPage(value)),
        onClickLogin: (value) => dispatch(actions.userLogin(value)),
        onClickSignup: (value) => dispatch(actions.userSignup(value)),
    }
}

export default connect(null, mapDispatchToProps)(Auth)
