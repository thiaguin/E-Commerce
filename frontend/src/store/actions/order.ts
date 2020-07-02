import * as actionTypes from './actionTypes'
import axios from 'axios'

export const setFinishingOrder = () => {
    return {
        type: actionTypes.SET_FINISHING_ORDER,
    }
}

export const setProductsOrder = (products) => {
    return {
        type: actionTypes.SET_PRODUCTS_ORDER,
        products: products,
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
