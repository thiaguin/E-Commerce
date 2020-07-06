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
        { name: 'Sobre', isAbout: true },
    ],
    start: false,
    departmentCategories: [],
    brands: [],
    maxPrice: 0,
    filters: [],
    highlights: [],
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

const getMaxPrice = (state, action) => {
    return {
        ...state,
        maxPrice: action.maxPrice,
    }
}

const setFilters = (state, action) => {
    return {
        ...state,
        filters: action.value,
    }
}

const getHighlights = (state, action) => {
    return {
        ...state,
        highlights: action.highlights,
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
        case actionTypes.GET_MAX_PRICE_SUCCESS:
            return getMaxPrice(state, action)
        case actionTypes.GET_HIGHLIGHTS_SUCCESS:
            return getHighlights(state, action)
        case actionTypes.SET_FILTERS:
            return setFilters(state, action)
        default:
            return {
                ...state,
            }
    }
}

export default reducer
