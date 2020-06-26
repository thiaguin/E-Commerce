import React, { useState } from 'react'
import classes from './ProductCard.module.css'
import imageDefault from '../../assets/image-default.png'
import ReactTooltip from 'react-tooltip'
import StarRatings from 'react-star-ratings'
import { useHistory } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BASE_URL
const Tooltip: React.HTMLElement = ReactTooltip

const ProductCard = (props) => {
    const product = props.product
    const history = useHistory()

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

    const clickHandler = () => {
        history.push(`/products/show/${product.id}`)
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

    const priceDiscounted =
        currentPrice !== originalPrice ? <h3>{originalPrice}</h3> : <h3 style={{ opacity: 0 }}>{originalPrice}</h3>

    return (
        <div onClick={clickHandler} className={classCss.join(' ')}>
            <img src={src} onError={onErrorImgHandler} alt={props.title} />
            <h1 data-tip={product.title}>{product.title}</h1>
            <Tooltip type="light" backgroundColor="#f0f0d0" />
            {props.isFull && <StarRatings {...ratingSettings} />}
            {priceDiscounted}
            <h2>{currentPrice}</h2>
        </div>
    )
}

export default ProductCard
