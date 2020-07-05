import * as actionTypes from '../actions/actionTypes'

const initialState = {
    datas: [],
    order: null,
}

const getOrders = (state, action) => {
    return {
        ...state,
        datas: action.data,
    }
}

const getOrder = (state, action) => {
    return {
        ...state,
        order: action.data,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_SUCCESS:
            return getOrders(state, action)
        case actionTypes.GET_ORDER_SUCCESS:
            return getOrder(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
