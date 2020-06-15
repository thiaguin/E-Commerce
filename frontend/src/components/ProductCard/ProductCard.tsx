import React from 'react'
import Aux from '../hoc/Aux'
import classes from './ProductCard.module.css'
const productCard = (props) => {
    return (
        <div style={{ outline: 'none !important' }}>
            <img
                className={classes.ProductCard}
                style={{ padding: props.padding || '0' }}
                src={props.photo}
                alt={props.title}
            />
        </div>
    )
}

export default productCard
