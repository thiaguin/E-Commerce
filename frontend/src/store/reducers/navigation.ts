import * as actionTypes from '../actions/actionTypes'

const initialState = {
    departments: {
        title: 'Todos os departamentos',
        departmentList: [
            { name: 'Informática' },
            { name: 'Celulares' },
            { name: 'Esporte' },
            { name: 'Televisão' },
            { name: 'Brinquedos' },
            { name: 'Games' },
        ],
    },
    categories: [
        { name: 'Ofertas' },
        { name: 'Lançamentos' },
        { name: 'Celular' },
        { name: 'Informática' },
        { name: 'Eletrodomésticos' },
        { name: 'Fale Conosco' },
    ],
}

const reducer = (state = initialState, action) => {
    return initialState
}

export default reducer
