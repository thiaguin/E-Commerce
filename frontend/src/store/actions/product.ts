import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getProductStart = () => {
    return {
        type: actionTypes.GET_PRODUCT_START,
    }
}

export const getProductFail = () => {
    return {
        type: actionTypes.GET_PRODUCT_FAIL,
    }
}

export const getProductSuccess = (data) => {
    return {
        type: actionTypes.GET_PRODUCT_SUCCESS,
        productFetched: data,
    }
}

export const getProduct = ({ id }) => {
    return (dispatch) => {
        axios
            .get(`/products/${id}`)
            .then((response) => dispatch(getProductSuccess(response.data)))
            .catch((error) => dispatch(getProductFail()))
    }
}
