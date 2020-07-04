import React from 'react'
import classes from './Search.module.css'
import Filters from './Filters/Filters'
import Products from './Products/Products'

const Search = (props) => {
    return (
        <div className={classes.Search}>
            <Filters />
            <Products />
        </div>
    )
}

export default Search
