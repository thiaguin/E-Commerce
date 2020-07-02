import * as actionTypes from './actionTypes'
import axios from '../../axios'
import { act } from '@testing-library/react'

export const setIsAuthPage = (value) => {
    return {
        type: actionTypes.SET_IS_AUTH_PAGE,
        value: value,
    }
}

export const userLoginStart = () => {
    return {
        type: actionTypes.USER_LOGIN_START,
        loading: false,
    }
}

export const userLoginFail = () => {
    return {
        type: actionTypes.USER_LOGIN_FAIL,
    }
}

export const userSignupFail = () => {
    return {
        type: actionTypes.USER_SIGNUP_FAIL,
    }
}

export const userLoginSuccess = ({ token }) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        token: token,
    }
}

export const userLogin = (body) => {
    return (dispatch) => {
        dispatch(userLoginStart())
        axios
            .post('/auth/login', body)
            .then((response) => dispatch(userLoginSuccess(response.data)))
            .catch((error) => {
                dispatch(userLoginFail())
            })
    }
}

export const userSignup = (body) => {
    return (dispatch) => {
        dispatch(userLoginStart())
        axios
            .post('/users', body)
            .then((response) => dispatch(userLogin(body)))
            .catch((error) => {
                dispatch(userLoginFail())
            })
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authLogoutAsync = (expiresTime) => {
    return (dispatch) => {
        setTimeout(() => dispatch(authLogout()), expiresTime * 1000)
    }
}

export const authSucces = () => {
    return {
        type: actionTypes.AUTH_SUCCESS,
    }
}

export const authCheck = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')

        if (token) {
            const dateExpiration = localStorage.getItem('expirationDate') || ''
            const expirationDate = new Date(dateExpiration)
            const dateNow = new Date()

            if (expirationDate > dateNow) {
                const expiresIn = (expirationDate.getTime() - dateNow.getTime()) / 1000
                dispatch(authSucces())
                dispatch(authLogoutAsync(expiresIn))
            } else {
                dispatch(authLogout())
            }
        } else {
            dispatch(authLogout())
        }
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        pathToRedirect: path
    }
}
