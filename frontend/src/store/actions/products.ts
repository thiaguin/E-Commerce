import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const setProductsQuery = (query) => {
    return {
        type: actionTypes.SET_PRODUCTS_QUERY,
        query: query,
    }
}

export const addProductQuery = (query) => {
    return {
        type: actionTypes.ADD_PRODUCTS_QUERY,
        query: query,
    }
}

export const removeProductQuery = (query) => {
    return {
        type: actionTypes.REMOVE_PRODUCTS_QUERY,
        query: query,
    }
}

export const resetProductsQuery = () => {
    return {
        type: actionTypes.RESET_PRODUCTS_QUERY,
    }
}

export const getProductsStart = () => {
    return {
        type: actionTypes.GET_PRODUCTS_START,
    }
}

export const getProductsFail = () => {
    return {
        type: actionTypes.GET_PRODUCTS_FAIL,
    }
}

export const getProductsSuccess = (data) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        productsFetched: data,
    }
}

export const getProducts = ({ params }) => {
    return (dispatch) => {
        axios
            .get('/products', {
                params,
            })
            .then((response) => dispatch(getProductsSuccess(response.data)))
            .catch((error) => {
                dispatch(getProductsFail())
            })
    }
}
