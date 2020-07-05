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

export const getProduct = ({ id, token }) => {
    const headers = {}
    if (token) headers['Authorization'] = token

    return (dispatch) => {
        axios
            .get(`/products/${id}`, { headers })
            .then((response) => dispatch(getProductSuccess(response.data)))
            .catch((error) => dispatch(getProductFail()))
    }
}

export const addFavoriteStart = () => {
    return {
        type: actionTypes.ADD_FAVORITE_START,
    }
}

export const addFavoriteFail = (error) => {
    return {
        type: actionTypes.ADD_FAVORITE_FAIL,
    }
}

export const addFavoriteSuccess = (data) => {
    return {
        type: actionTypes.ADD_FAVORITE_SUCCESS,
        favorite: data,
    }
}

export const addFavorite = ({ id, token }) => {
    return (dispatch) => {
        axios
            .post(`/products/favorite/${id}`, {}, { headers: { Authorization: token } })
            .then((response) => dispatch(addFavoriteSuccess(response.data)))
            .catch((error) => dispatch(addFavoriteFail(error)))
    }
}

export const removeFavoriteStart = () => {
    return {
        type: actionTypes.REMOVE_FAVORITE_START,
    }
}

export const removeFavoriteFail = (error) => {
    return {
        type: actionTypes.REMOVE_FAVORITE_FAIL,
    }
}

export const removeFavoriteSuccess = (id) => {
    return {
        type: actionTypes.REMOVE_FAVORITE_SUCCESS,
        productId: id,
    }
}

export const removeFavorite = ({ id, token }) => {
    return (dispatch) => {
        axios
            .delete(`/products/favorite/${id}`, { headers: { Authorization: token } })
            .then((response) => dispatch(removeFavoriteSuccess(id)))
            .catch((error) => dispatch(removeFavoriteFail(error)))
    }
}
