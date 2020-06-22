import * as actionTypes from '../actions/actionTypes'

const initialState = {
    query: {},
    products: [],
    count: 0,
}

const getProductsSuccess = (state, action) => {
    return {
        ...state,
        products: [...action.productsFetched.products],
        count: action.productsFetched.count,
    }
}

const setProductsQuery = (state, action) => {
    return {
        ...state,
        query: action.query,
    }
}

const resetProductsQuery = (state) => {
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return getProductsSuccess(state, action)
        case actionTypes.SET_PRODUCTS_QUERY:
            return setProductsQuery(state, action)
        case actionTypes.RESET_PRODUCTS_QUERY:
            return resetProductsQuery(state)
        case actionTypes.ADD_PRODUCTS_QUERY:
            return addProductQuery(state, action)
        case actionTypes.REMOVE_PRODUCTS_QUERY:
            return removeProductQuery(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
