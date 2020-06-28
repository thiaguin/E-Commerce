import * as actionTypes from '../actions/actionTypes'
import jwt from 'jwt-decode'

const initialState = {
    token: null,
    username: null,
    userId: null,
}

const userLogin = (state, action) => {
    const decoded: any = jwt(action.token)
    const expirationDate = new Date(decoded.exp * 1000)

    localStorage.setItem('token', action.token)
    localStorage.setItem('expirationDate', `${expirationDate}`)
    localStorage.setItem('userId', decoded.id)
    localStorage.setItem('username', decoded.username)

    return {
        ...state,
        token: action.token,
        username: decoded.username,
        userId: decoded.id,
    }
}

const authSucces = (state, action) => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')

    return {
        ...state,
        token: token,
        username: username,
        userId: userId,
    }
}

const authLogout = (state, action) => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')

    return {
        ...state,
        token: null,
        username: null,
        userId: null,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return userLogin(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSucces(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
