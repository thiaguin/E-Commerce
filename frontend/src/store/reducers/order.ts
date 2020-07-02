import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isFinishing: false,
    products: [],
    localization: null,
}

const setFinishingOrder = (state, action) => {
    return {
        isFinishing: true,
    }
}

const setProductsOrder = (state, action) => {
    return {
        ...state,
        products: action.products,
    }
}

const getLocalization = (state, action) => {
    console.log('action', action)
    return {
        ...state,
        localization: action.localization,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FINISHING_ORDER:
            return setFinishingOrder(state, action)
        case actionTypes.SET_PRODUCTS_ORDER:
            return setProductsOrder(state, action)
        case actionTypes.GET_LOCALIZATION_SUCCESS:
            return getLocalization(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
