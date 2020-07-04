import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START,
    }
}

export const getOrdersFail = () => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
    }
}

export const getOrdersSuccess = (data) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        data: data,
    }
}

export const getOrders = (token) => {
    return (dispatch) => {
        axios
            .get('/orders', { headers: { Authorization: token } })
            .then((response) => dispatch(getOrdersSuccess(response.data)))
            .catch((error) => dispatch(getOrdersFail()))
    }
}

export const getOrderStart = () => {
    return {
        type: actionTypes.GET_ORDER_START,
    }
}

export const getOrderFail = () => {
    return {
        type: actionTypes.GET_ORDER_FAIL,
    }
}

export const getOrderSuccess = (data) => {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        data: data,
    }
}

export const getOrder = ({ orderId, token }) => {
    return (dispatch) => {
        axios
            .get(`/orders/${orderId}`, { headers: { Authorization: token } })
            .then((response) => dispatch(getOrderSuccess(response.data)))
            .catch((error) => dispatch(getOrderFail()))
    }
}
