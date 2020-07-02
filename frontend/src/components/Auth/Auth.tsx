import React, { useEffect, useState } from 'react'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import background from '../../assets/e-commerce.png'
import Spinner from '../Spinner/Spinner'
import Aux from '../hoc/Aux'
import { Redirect } from 'react-router-dom'

const Auth = (props) => {
    const { onSetIsAuthPage } = props

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const redirectPath = props.auth?.pathToRedirect || '/'
    const isFinishinOrder = props.order?.isFinishing
    const authRedirect = props.onAuthRedirect

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

    const isAuth = props.auth?.token ? <Redirect to={redirectPath} /> : null

    useEffect(() => {
        onSetIsAuthPage(true)
    }, [onSetIsAuthPage])

    useEffect(() => {
        if (!isFinishinOrder && redirectPath !== '/') {
            authRedirect('/')
        }
    }, [authRedirect, isFinishinOrder, redirectPath])

    return (
        <Aux>
            {isAuth}
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

                    {props.auth?.loading ? (
                        <div style={{ margin: 0 }}>
                            <Spinner className="LoaderLogin" />
                        </div>
                    ) : (
                        <Aux>
                            <button onClick={onSignupClickHandler} className={classes.Signup}>
                                Cadastre-se
                            </button>
                            <button onClick={onLoginClickHandler} className={classes.Login}>
                                Login
                            </button>
                        </Aux>
                    )}
                </div>
            </div>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        order: state.order,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetIsAuthPage: (value) => dispatch(actions.setIsAuthPage(value)),
        onClickLogin: (value) => dispatch(actions.userLogin(value)),
        onClickSignup: (value) => dispatch(actions.userSignup(value)),
        onAuthRedirect: (value) => dispatch(actions.setRedirectPath(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
