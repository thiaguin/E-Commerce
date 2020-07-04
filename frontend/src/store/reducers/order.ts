import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isFinishing: false,
    products: [],
    localization: null,
    freight: null,
    postLoading: false,
    postSuccess: false,
    postErro: false,
}

const setFinishingOrder = (state, action) => {
    return {
        ...state,
        isFinishing: true,
    }
}

const setOrder = (state, action) => {
    return {
        ...state,
        products: action.products,
        freight: action.freight,
    }
}

const getLocalization = (state, action) => {
    return {
        ...state,
        localization: action.localization,
    }
}

const makerOrder = (state, action) => {
    localStorage.setItem('shoppingCart', '')

    return {
        ...state,
        postLoading: false,
        postSuccess: true,
    }
}

const makerOrderStart = (state, action) => {
    return {
        ...state,
        postLoading: true,
    }
}

const makeOrderFail = (state, action) => {
    return {
        ...state,
        postErro: true,
    }
}

const resetOrder = (state, action) => {
    return {
        isFinishing: false,
        products: [],
        localization: null,
        freight: null,
        postLoading: false,
        postSuccess: false,
        postErro: false,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_FINISHING_ORDER:
            return setFinishingOrder(state, action)
        case actionTypes.SET_PRODUCTS_ORDER:
            return setOrder(state, action)
        case actionTypes.GET_LOCALIZATION_SUCCESS:
            return getLocalization(state, action)
        case actionTypes.MAKE_ORDER_SUCCESS:
            return makerOrder(state, action)
        case actionTypes.MAKE_ORDER_START:
            return makerOrderStart(state, action)
        case actionTypes.MAKE_ORDER_FAIL:
            return makeOrderFail(state, action)
        case actionTypes.RESET_ORDER:
            return resetOrder(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
