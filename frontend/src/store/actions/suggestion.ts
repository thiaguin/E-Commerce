import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getSuggestionsStart = () => {
    return {
        type: actionTypes.GET_SUGGESTIONS_START,
    }
}

export const getSuggestionsFail = () => {
    return {
        type: actionTypes.GET_SUGGESTIONS_FAIL,
    }
}

export const getSuggestionsSuccess = (data, title) => {
    return {
        type: actionTypes.GET_SUGGESTIONS_SUCCESS,
        productsFetched: data,
        title: title,
    }
}

export const getSuggestions = ({ params, title }) => {
    return (dispatch) => {
        axios
            .get('/products', {
                params,
            })
            .then((response) => dispatch(getSuggestionsSuccess(response.data, title)))
            .catch((error) => {
                dispatch(getSuggestionsFail())
            })
    }
}
