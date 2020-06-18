import React, { useState, useEffect, useCallback } from 'react'
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
    renderBottomCenterControls: Function
    slidesToShow: number
    slidesToScroll: number
}

const Suggestion = (props) => {
    const Carousel: React.Component = NukaCarousel
    const products = [
        <ProductCard key="1" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="2" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="3" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="4" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="51" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="16" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="17" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="18" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="19" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="11" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="12" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="13" padding="0 20px" {...props.products[0]} />,
        <ProductCard key="14" padding="0 20px" {...props.products[0]} />,
    ]

    const [width, setWidth] = useState(window.innerWidth)

    const getItemsPerPage = useCallback(() => {
        if (width > 1500) return 7
        else if (width > 960) return 5
        else if (width > 620) return 3
        else return 1
    }, [width])

    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const maxPage = Math.ceil(products.length / getItemsPerPage())

    const onresize = () => {
        setWidth(document.body.clientWidth)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const previousPage = () => {
        setPage(page - 1)
    }

    const settings: Settings = {
        renderCenterLeftControls: ({ previousSlide }) => (
            <button onClick={previousSlide && previousPage}>
                <img style={{ paddingLeft: '30px' }} src={previousSvg} alt="previous" />
            </button>
        ),
        renderCenterRightControls: ({ nextSlide }) => (
            <button onClick={nextSlide && nextPage}>
                <img style={{ paddingRight: '30px' }} src={nextSvg} alt="next" />
            </button>
        ),
        className: classes.Carousel,
        height: '370px',
        renderBottomCenterControls: () => false,
        slidesToShow: itemsPerPage,
        slidesToScroll: itemsPerPage,
    }

    settings.renderCenterLeftControls = page === 1 ? null : settings.renderCenterLeftControls
    settings.renderCenterRightControls = page === maxPage ? null : settings.renderCenterRightControls

    window.addEventListener('resize', onresize)

    useEffect(() => {
        setItemsPerPage(getItemsPerPage())
    }, [getItemsPerPage, width])

    return (
        <div className={classes.Suggestion}>
            <h1>{props.title}</h1>
            <Carousel {...settings}>{products}</Carousel>
        </div>
    )
}

export default Suggestion
