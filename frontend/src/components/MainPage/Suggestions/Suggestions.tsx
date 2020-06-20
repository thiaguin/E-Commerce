import React, { useEffect, useCallback } from 'react'
import Suggestion from './Suggestion/Suggestion'
import * as actions from '../../../store/actions/index'
import { connect, useDispatch } from 'react-redux'

const Suggestions = (props) => {
    const dispatch = useDispatch()

    const getBestSellers = useCallback((params) => dispatch(actions.getSuggestions(params)), [dispatch])

    useEffect(() => {
        const bestSellersParam = {
            title: 'Mais Vendidos',
            params: { hasStock: true, take: 15, 'order[field]': 'saleQuantity' },
        }
        getBestSellers(bestSellersParam)
    }, [getBestSellers])

    useEffect(() => {
        const bestSellersParam = {
            title: 'Maiores Ofertas',
            params: { hasStock: true, take: 15, 'order[field]': 'discount' },
        }
        getBestSellers(bestSellersParam)
    }, [getBestSellers])

    useEffect(() => {
        const bestSellersParam = {
            title: 'Novidades',
            params: { hasStock: true, take: 15, 'order[field]': 'createdAt' },
        }
        getBestSellers(bestSellersParam)
    }, [getBestSellers])

    const { productSuggestions } = props.suggestions

    const suggestionlist = productSuggestions.map((element, index) => {
        return <Suggestion title={element.title} products={element.products} key={index} />
    })

    return <div>{suggestionlist}</div>
}

const mapStateToProps = (state) => {
    return {
        suggestions: state.suggestions,
    }
}

export default connect(mapStateToProps)(Suggestions)
