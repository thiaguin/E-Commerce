import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const getDepartmentsStart = () => {
    return {
        type: actionTypes.GET_DEPARTMENTS_START,
    }
}

export const getDepartmentFail = () => {
    return {
        type: actionTypes.GET_DEPARTMENTS_FAIL,
    }
}

export const getDepartmentSuccess = (data) => {
    return {
        type: actionTypes.GET_DEPARTMENTS_SUCCESS,
        departmentsFetched: data,
    }
}

export const getDepartment = () => {
    return (dispatch) => {
        axios
            .get('/departments')
            .then((response) => dispatch(getDepartmentSuccess(response.data)))
            .catch((error) => {
                dispatch(getDepartmentFail())
            })
    }
}

export const getCategoriesStart = () => {
    return {
        type: actionTypes.GET_CATEGORIES_START,
    }
}

export const getCategoriesFail = () => {
    return {
        type: actionTypes.GET_CATEGORIES_FAIL,
    }
}

export const getCategoriesSuccess = (data) => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        departmentCategories: data,
    }
}

export const getCategories = (params) => {
    return (dispatch) => {
        axios
            .get('/departments', { params: { ...params, relations: true } })
            .then((response) => dispatch(getCategoriesSuccess(response.data)))
            .catch((error) => {
                dispatch(getCategoriesFail())
            })
    }
}

export const getBrandsFilterStart = () => {
    return {
        type: actionTypes.GET_BRANDS_DEPARTMENT_START,
    }
}

export const getBrandsFilterFail = () => {
    return {
        type: actionTypes.GET_BRANDS_DEPARTMENT_FAIL,
    }
}

export const getBrandsFilterSuccess = (data) => {
    return {
        type: actionTypes.GET_BRANDS_DEPARTMENT_SUCCESS,
        brandsDepartment: data,
    }
}

export const getBrandsFilter = ({ entity, entityId }) => {
    return (dispatch) => {
        axios
            .get(`/${entity}/brands/${entityId}`)
            .then((response) => dispatch(getBrandsFilterSuccess(response.data)))
            .catch((error) => {
                dispatch(getBrandsFilterFail())
            })
    }
}

export const getMaxPriceStart = () => {
    return {
        type: actionTypes.GET_MAX_PRICE_START,
    }
}

export const getMaxPriceFail = () => {
    return {
        type: actionTypes.GET_MAX_PRICE_FAIL,
    }
}

export const getMaxPriceSuccess = ({ price }) => {
    return {
        type: actionTypes.GET_MAX_PRICE_SUCCESS,
        maxPrice: price || 0,
    }
}

export const getMaxPrice = (query) => {
    return (dispatch) => {
        axios
            .get(`/products/maxPrice`, { params: query })
            .then((response) => dispatch(getMaxPriceSuccess(response.data)))
            .catch((error) => {
                dispatch(getMaxPriceFail())
            })
    }
}

export const getHighlightsStart = () => {
    return {
        type: actionTypes.GET_HIGHLIGHTS_START,
    }
}

export const getHighlightsFail = () => {
    return {
        type: actionTypes.GET_HIGHLIGHTS_FAIL,
    }
}

export const getHighlightsSuccess = (data) => {
    return {
        type: actionTypes.GET_HIGHLIGHTS_SUCCESS,
        highlights: data,
    }
}

export const getHighlights = () => {
    return (dispatch) => {
        axios
            .get(`/highlights`)
            .then((response) => dispatch(getHighlightsSuccess(response.data)))
            .catch((error) => {
                dispatch(getHighlightsFail())
            })
    }
}

export const setFilters = (value) => {
    return {
        type: actionTypes.SET_FILTERS,
        value: value,
    }
}
