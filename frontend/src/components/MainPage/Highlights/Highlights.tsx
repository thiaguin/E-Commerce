import React from 'react'
import mainImg from '../../../assets/background.png'
import shanks from '../../../assets/shanks.jpg'
import * as ResponsiveCarousel from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import classes from './Highlights.module.css'

const Carousel: React.Component = ResponsiveCarousel.Carousel

const highlights = (props) => {
    const settings = {
        interval: 3500,
        transitionTime: 500,
        autoPlay: true,
        showArrows: true,
        showThumbs: false,
        infiniteLoop: true,
        showStatus: false,
    }

    return (
        <div className={classes.Highlights}>
            <Carousel {...settings}>
                <img src={mainImg} alt="main"></img>
                <img src={shanks} alt="logo"></img>
            </Carousel>
        </div>
    )
}

export default highlights
