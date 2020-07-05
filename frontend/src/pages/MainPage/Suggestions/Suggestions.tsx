import React, { useEffect, useCallback } from 'react'
import Suggestion from './Suggestion/Suggestion'
import * as actions from '../../../store/actions/index'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Suggestions = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const getSuggestions = useCallback((params) => dispatch(actions.getSuggestions(params)), [dispatch])

    const clickTitleHandler = (query) => {
        props.onClickTitleHandler(query)
        history.push('/products')
    }

    const suggestionsLength = props.suggestions?.productSuggestions?.length

    useEffect(() => {
        if (!suggestionsLength) {
            const bestSellersQuery = { hasStock: true, 'order[field]': 'saleQuantity' }
            const offersQuery = { hasStock: true, 'order[field]': 'discount' }
            const newsQuery = { hasStock: true, 'order[field]': 'createdAt' }

            const bestSellersParam = {
                title: 'Mais Vendidos',
                params: { ...bestSellersQuery, take: 15 },
                queryDefault: bestSellersQuery,
            }

            const bestOffersParam = {
                title: 'Maiores Ofertas',
                params: { ...offersQuery, take: 15 },
                queryDefault: offersQuery,
            }

            const newsParam = {
                title: 'Novidades',
                params: { ...newsQuery, take: 15 },
                queryDefault: newsQuery,
            }

            getSuggestions(bestSellersParam)
            getSuggestions(bestOffersParam)
            getSuggestions(newsParam)
        }
    }, [getSuggestions, suggestionsLength])

    const { productSuggestions } = props.suggestions

    const suggestionlist = productSuggestions.map((element, index) => {
        return (
            <Suggestion
                title={element.title}
                clickTitle={clickTitleHandler}
                query={element.query}
                products={element.products}
                key={index}
            />
        )
    })

    return <div>{suggestionlist}</div>
}

const mapStateToProps = (state) => {
    return {
        suggestions: state.suggestions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickTitleHandler: (query) => dispatch(actions.setProductsQuery(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions)
