import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: null,
}

const getProduct = (state, action) => {
    return {
        ...state,
        data: action.productFetched,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_SUCCESS:
            return getProduct(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
