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
