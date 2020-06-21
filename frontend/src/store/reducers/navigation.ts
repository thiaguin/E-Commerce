import * as actionTypes from '../actions/actionTypes'

const initialState = {
    departments: {
        title: 'Todos os departamentos',
        departmentList: [],
    },
    categories: [
        { name: 'Ofertas', query: { 'order[field]': 'discount' } },
        { name: 'Lançamentos', query: { 'order[field]': 'createdAt' } },
        { name: 'Celular' },
        { name: 'Informática' },
        { name: 'Eletrodomésticos' },
        { name: 'Fale Conosco', isFac: true },
    ],
    start: false,
    departmentCategories: [],
    brands: [],
}

const getDepartmentsSuccess = (state, action) => {
    const departmentsList = action.departmentsFetched.map((department) => {
        return { id: department.id, name: department.name }
    })

    const categoriesList = state.categories.map((element) => {
        const [department] = action.departmentsFetched.filter((department) => department.name === element.name)

        return department ? { name: department.name, query: { department: department.id } } : element
    })

    return {
        ...state,
        departments: {
            ...state.departments,
            departmentList: departmentsList,
        },
        categories: categoriesList,
    }
}

const getCategoriesDepartment = (state, action) => {
    return {
        ...state,
        departmentCategories: action.departmentCategories,
    }
}

const getBrandsFilter = (state, action) => {
    return {
        ...state,
        brands: action.brandsDepartment,
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
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return getCategoriesDepartment(state, action)
        case actionTypes.GET_BRANDS_DEPARTMENT_SUCCESS:
            return getBrandsFilter(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
