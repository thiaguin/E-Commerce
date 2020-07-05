import React from 'react'
import classes from './Pagination.module.css'
import nextSvg from '../../../assets/next.svg'
import previousSvg from '../../../assets/previous.svg'
import PageNumber from './PageNumber'

export const pagination = (props) => {
    const maxPage = Math.ceil(props.count / props.itemsPerPage)
    let firstPage = props.current > 2 ? props.current - 2 : 1
    const lastPage = props.current + 2 >= maxPage ? maxPage : props.current > 3 ? props.current + 2 : 5
    const showPreviousIcon = props.current !== 1
    const showNextIcon = props.current !== maxPage

    firstPage = lastPage - firstPage < 5 && maxPage > 5 ? lastPage - 4 : firstPage
    const pageNumbers: React.Element = []

    for (let i = firstPage; i <= lastPage; i++) {
        pageNumbers.push(<PageNumber click={props.click} key={i} number={i} selected={i === props.current} />)
    }

    return (
        <div className={classes.Pagination}>
            {showPreviousIcon && (
                <img
                    onClick={() => props.click(props.current - 1)}
                    className={classes.PageIcon}
                    src={previousSvg}
                    alt="previous"
                />
            )}
            {pageNumbers}
            {showNextIcon && (
                <img
                    onClick={() => props.click(props.current + 1)}
                    className={classes.PageIcon}
                    src={nextSvg}
                    alt="next"
                />
            )}
        </div>
    )
}

export default pagination
