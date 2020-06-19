import React from 'react'
import classes from './Filter.module.css'
import StarRatings from 'react-star-ratings'

const filterRating = (props) => {
    const ratingSettings = {
        starEmptyColor: '#A9A9A9',
        starRatedColor: '#CCCC00',
        rating: 1,
        starDimension: '15px',
        starSpacing: '2px',
    }

    const starRatings = Array(5)
        .fill(0)
        .map((_, index) => {
            const settings = { ...ratingSettings, rating: index + 1 }
            return (
                <div key={index} className={classes.Rating}>
                    <StarRatings {...settings} />
                </div>
            )
        })

    return (
        <div className={classes.Filter}>
            <h4>Avaliação</h4>
            <ul>{starRatings}</ul>
        </div>
    )
}

export default filterRating
