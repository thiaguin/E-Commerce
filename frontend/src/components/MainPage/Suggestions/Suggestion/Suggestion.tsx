import React, { useState, useEffect } from 'react'
import classes from './Suggestion.module.css'
import ProductCard from '../../../ProductCard/ProductCard'
import nextSvg from '../../../../assets/next.svg'
import previousSvg from '../../../../assets/previous.svg'
import NukaCarousel from 'nuka-carousel'

interface Settings {
    renderCenterLeftControls: React.HTMLElement | null
    renderCenterRightControls: React.HTMLElement | null
    className: string
    height: string
    renderBottomCenterControls: boolean
    slidesToShow: number
    slidesToScroll: number
}

const Suggestion = (props) => {
    const Carousel: React.Component = NukaCarousel
    const products = [
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
        <ProductCard padding="0 20px" {...props.products[0]} />,
    ]

    const [page, setPage] = useState(1)
    const maxPage = Math.ceil(products.length / 5)

    const settings: Settings = {
        renderCenterLeftControls: ({ previousSlide }) => (
            <button onClick={previousSlide && previousPage}>
                <img style={{ paddingLeft: '30px' }} src={previousSvg} alt="previous" />
            </button>
        ),
        renderCenterRightControls: ({ nextSlide }) => (
            <button style={{ paddingRight: '30px' }} onClick={nextSlide && nextPage}>
                <img src={nextSvg} alt="next" />
            </button>
        ),
        className: classes.Carousel,
        height: '370px',
        renderBottomCenterControls: false,
        slidesToShow: 5,
        slidesToScroll: 5,
    }
    const nextPage = () => {
        setPage(page + 1)
    }

    const previousPage = () => {
        setPage(page + 1)
    }

    settings.renderCenterLeftControls = page === 1 ? null : settings.renderCenterLeftControls
    settings.renderCenterRightControls = page === maxPage ? null : settings.renderCenterRightControls

    return (
        <div className={classes.Suggestion}>
            <h1>{props.title}</h1>
            <Carousel {...settings}>{products}</Carousel>
        </div>
    )
}

export default Suggestion
