import * as actionTypes from './actionTypes'
import axios from 'axios'
import axiosInstance from '../../axios'

export const setFinishingOrder = () => {
    return {
        type: actionTypes.SET_FINISHING_ORDER,
    }
}

export const setOrder = (value) => {
    return {
        type: actionTypes.SET_PRODUCTS_ORDER,
        products: value.products,
        freight: value.freight,
    }
}

export const getLocalizationStart = () => {
    return {
        type: actionTypes.GET_LOCALIZATION_START,
    }
}

export const getLocalizationFail = () => {
    return {
        type: actionTypes.GET_LOCALIZATION_FAIL,
    }
}

export const getLocalizationSuccess = (data) => {
    return {
        type: actionTypes.GET_LOCALIZATION_SUCCESS,
        localization: data,
    }
}

export const getLocalization = (cep) => {
    return (dispatch) => {
        dispatch(getLocalizationStart())
        axios
            .get(`https://viacep.com.br/ws/${cep}/json`)
            .then((response) => dispatch(getLocalizationSuccess(response.data)))
            .catch((error) => dispatch(getLocalizationFail()))
    }
}

export const makerOrderStart = () => {
    return {
        type: actionTypes.MAKE_ORDER_START,
    }
}

export const makerOrderFail = () => {
    return {
        type: actionTypes.MAKE_ORDER_FAIL,
    }
}

export const makerOrderSuccess = (data) => {
    return {
        type: actionTypes.MAKE_ORDER_SUCCESS,
        data: data,
    }
}

export const makerOrder = ({ order, token }) => {
    return (dispatch) => {
        dispatch(makerOrderStart())
        axiosInstance
            .post('/orders', order, { headers: { Authorization: token } })
            .then((response) => dispatch(makerOrderSuccess(response.data)))
            .catch((error) => {
                dispatch(makerOrderFail())
            })
    }
}

export const resetOrder = () => {
    return {
        type: actionTypes.RESET_ORDER,
    }
}

export const evaluateProductStart = () => {
    return {
        type: actionTypes.EVALUATE_PRODUCT_START,
    }
}

export const evaluateProductFail = () => {
    return {
        type: actionTypes.EVALUATE_PRODUCT_FAIL,
    }
}

export const evaluateProductSuccess = (data, productId, body) => {
    return {
        type: actionTypes.EVALUATE_PRODUCT_SUCCESS,
        data: data,
        productId: productId,
        productOrderId: body.productOrderId,
    }
}

export const evaluateProduct = ({ productId, body, token }) => {
    return (dispatch) => {
        axiosInstance
            .post(`/products/evaluate/${productId}`, body, { headers: { Authorization: token } })
            .then((response) => dispatch(evaluateProductSuccess(response.data, productId, body)))
            .catch((error) => dispatch(evaluateProductFail()))
    }
}
