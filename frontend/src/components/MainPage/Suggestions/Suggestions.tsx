import React from 'react'
import Suggestion from './Suggestion/Suggestion'
import onepieceimg from '../../../assets/One-Piece.png'

const suggestions = (props) => {
    const productSuggestions = [
        {
            title: 'Sugestão 1',
            products: [
                {
                    title: 'Produto bom',
                    price: 50000,
                    rating: 0,
                    discount: 0,
                    photo: onepieceimg,
                },
            ],
        },
        {
            title: 'Sugestão 2',
            products: [
                {
                    title: 'Produto bom',
                    price: 50000,
                    rating: 0,
                    discount: 0,
                    photo: onepieceimg,
                },
            ],
        },
        {
            title: 'Sugestão 3',
            products: [
                {
                    title: 'Produto bom',
                    price: 50000,
                    rating: 0,
                    discount: 0,
                    photo: onepieceimg,
                },
            ],
        },
    ]

    const suggestionlist = productSuggestions.map((element, index) => {
        return <Suggestion title={element.title} products={element.products} key={index} />
    })

    return <div>{suggestionlist}</div>
}

export default suggestions
