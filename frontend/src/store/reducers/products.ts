import * as actionTypes from '../actions/actionTypes'

const initialState = {
    query: {},
    products: [],
    count: 0,
    loading: false,
}

const getProductsSuccess = (state, action) => {
    return {
        ...state,
        products: [...action.productsFetched.products],
        count: action.productsFetched.count,
        loading: false,
    }
}

const setProductsQuery = (state, action) => {
    return {
        ...state,
        query: action.query,
    }
}

const resetProductsQuery = (state, action) => {
    return {
        ...state,
        query: {},
        products: [],
        count: 0,
    }
}

const addProductQuery = (state, action) => {
    return {
        ...state,
        query: {
            ...state.query,
            ...action.query,
        },
    }
}

const removeProductQuery = (state, action) => {
    const newQuery = { ...state.query }

    for (const element of action.query) {
        delete newQuery[element]
    }

    return {
        ...state,
        query: newQuery,
    }
}

const getProductStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return getProductsSuccess(state, action)
        case actionTypes.SET_PRODUCTS_QUERY:
            return setProductsQuery(state, action)
        case actionTypes.RESET_PRODUCTS_QUERY:
            return resetProductsQuery(state, action)
        case actionTypes.ADD_PRODUCTS_QUERY:
            return addProductQuery(state, action)
        case actionTypes.REMOVE_PRODUCTS_QUERY:
            return removeProductQuery(state, action)
        case actionTypes.GET_PRODUCTS_START:
            return getProductStart(state, action)
        case actionTypes.MAKE_ORDER_SUCCESS:
            return resetProductsQuery(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
