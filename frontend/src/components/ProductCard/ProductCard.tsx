import React, { useState } from 'react'
import classes from './ProductCard.module.css'
import imageDefault from '../../assets/image-default.png'
import ReactTooltip from 'react-tooltip'
import StarRatings from 'react-star-ratings'

const BASE_URL = process.env.REACT_APP_BASE_URL
const Tooltip: React.HTMLElement = ReactTooltip

const ProductCard = (props) => {
    const product = {
        id: 4,
        title: 'Produto bom',
        description: null,
        technicalInformation: null,
        price: 78211,
        rating: 70,
        ratingQuantity: 0,
        stockQuantity: 0,
        hasStock: false,
        saleQuantity: 0,
        discount: 2,
        createdAt: '2020-06-14T21:34:48.337Z',
        updatedAt: '2020-06-14T21:52:15.952Z',
        brand: 1,
        category: 1,
        photo: 2,
    }

    const ratingSettings = {
        starEmptyColor: '#A9A9A9',
        starRatedColor: '#CCCC00',
        rating: 0.05 * product.rating,
        starDimension: '15px',
        starSpacing: '2px',
    }

    const [src, setSrc] = useState(`${BASE_URL}/photos/${product.photo}`)
    const classCss = [classes.ProductCard]

    const onErrorImgHandler = () => {
        setSrc(imageDefault)
    }

    const getPrice = (price) => {
        const value = price / 100
        const result = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        return result
    }

    const priceWithDiscount = () => {
        const forDiscount = (100 - product.discount) / 100
        const priceDiscounted = Math.round(product.price * forDiscount)

        return getPrice(priceDiscounted)
    }

    const originalPrice = getPrice(product.price)
    const currentPrice = priceWithDiscount()

    if (props.isFull) classCss.push(classes.Full)

    return (
        <div className={classCss.join(' ')}>
            <img src={src} onError={onErrorImgHandler} alt={props.title} />
            <h1 data-tip={product.title}>sfasfafssafasfasffasfasfasfsaasfasasfasassaasfasfasfasf top de verdade</h1>
            <Tooltip type="light" backgroundColor="#f0f0d0" />
            {props.isFull && <StarRatings {...ratingSettings} />}
            {currentPrice !== originalPrice ? (
                <h3>{originalPrice}</h3>
            ) : (
                <h3 style={{ opacity: 0 }}>{originalPrice}</h3>
            )}
            <h2>{currentPrice}</h2>
        </div>
    )
}

export default ProductCard
