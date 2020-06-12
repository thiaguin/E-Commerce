import * as actionTypes from '../actions/actionTypes'

const initialState = {
    allDepartments: { name: 'Todos os departamentos' },
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
