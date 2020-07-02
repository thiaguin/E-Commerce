import React, { useEffect } from 'react'
import classes from './Order.module.css'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Order = (props) => {
    console.log('props', props)

    const products = props.order?.products
    const history = useHistory()

    useEffect(() => {
        if (products.length === 0) {
            console.log('here')
            history.push('/shopping')
        }
    }, [history, products])

    return <div className={classes.Order}>order</div>
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
    }
}

export default connect(mapStateToProps)(Order)
