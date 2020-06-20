import * as actionTypes from '../actions/actionTypes'
import onepieceimg from '../../assets/One-Piece.png'

const initialState = {
    productSuggestions: [],
}

const getSuggestionsSuccess = (state, action) => {
    return {
        ...state,
        productSuggestions: [...state.productSuggestions, { title: action.title, products: action.productsFetched }],
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SUGGESTIONS_SUCCESS:
            return getSuggestionsSuccess(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
