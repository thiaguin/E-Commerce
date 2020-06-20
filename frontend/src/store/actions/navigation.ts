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
