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

export const getSuggestionsSuccess = (data, title, query) => {
    return {
        type: actionTypes.GET_SUGGESTIONS_SUCCESS,
        productsFetched: data,
        title: title,
        query: query,
    }
}

export const getSuggestions = ({ params, title, queryDefault }) => {
    return (dispatch) => {
        axios
            .get('/products', {
                params,
            })
            .then((response) => dispatch(getSuggestionsSuccess(response.data, title, queryDefault)))
            .catch((error) => {
                dispatch(getSuggestionsFail())
            })
    }
}