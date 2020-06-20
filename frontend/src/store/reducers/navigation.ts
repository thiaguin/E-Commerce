import * as actionTypes from '../actions/actionTypes'

const initialState = {
    departments: {
        title: 'Todos os departamentos',
        departmentList: [],
    },
    categories: [
        { name: 'Ofertas' },
        { name: 'Lançamentos' },
        { name: 'Celular' },
        { name: 'Informática' },
        { name: 'Eletrodomésticos' },
        { name: 'Fale Conosco' },
    ],
    start: false,
}

const getDepartmentsSuccess = (state, action) => {
    const departmentsList = action.departmentsFetched.map((department) => {
        return { id: department.id, name: department.name }
    })

    return {
        ...state,
        departments: {
            ...state.departments,
            departmentList: departmentsList,
        },
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DEPARTMENTS_START:
            return {
                ...state,
                start: true,
            }
        case actionTypes.GET_DEPARTMENTS_SUCCESS:
            return getDepartmentsSuccess(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
