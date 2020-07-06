import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: null,
    favorite: {},
}

const getProduct = (state, action) => {
    return {
        ...state,
        data: action.productFetched,
        favorite: {},
    }
}

const addFavorite = (state, action) => {
    return {
        ...state,
        favorite: { [action.favorite?.productId]: 'ADDED' },
    }
}

const removeFavorite = (state, action) => {
    return {
        ...state,
        favorite: {
            ...state.favorite,
            [action.productId]: 'REMOVED',
        },
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_SUCCESS:
            return getProduct(state, action)
        case actionTypes.ADD_FAVORITE_SUCCESS:
            return addFavorite(state, action)
        case actionTypes.REMOVE_FAVORITE_SUCCESS:
            return removeFavorite(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
