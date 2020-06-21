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
    const products = props.products.products.map((element) => {
        return <ProductCard key={element.id} padding="0 20px" product={element} />
    })

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

    const nextPage = (nextSlide) => {
        nextSlide()
        setPage(page + 1)
    }

    const previousPage = (previousSlide) => {
        previousSlide()
        setPage(page - 1)
    }

    const settings: Settings = {
        renderCenterLeftControls: ({ previousSlide }) => (
            <button onClick={() => previousPage(previousSlide)}>
                <img style={{ paddingLeft: '30px' }} src={previousSvg} alt="previous" />
            </button>
        ),
        renderCenterRightControls: ({ nextSlide }) => (
            <button onClick={() => nextPage(nextSlide)}>
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
            <h1 onClick={() => props.clickTitle(props.query)}>{props.title}</h1>
            <Carousel {...settings}>{products}</Carousel>
        </div>
    )
}

export default Suggestion
