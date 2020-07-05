import React, { useCallback, useEffect } from 'react'
import classes from './Favorites.module.css'
import * as actions from '../../store/actions/index'
import { connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'

const Favorites = (props) => {
    const dispatch = useDispatch()
    const onInitPage = useCallback((value) => dispatch(actions.getFavoritesProducts(value)), [dispatch])
    const token = props.auth?.token
    const auth = !token ? <Redirect to="/auth" /> : null

    let productsList = null

    if (props.products.count > 0) {
        const { products } = props.products
        productsList = products.map((element) => {
            return <ProductCard isFull={true} key={element.id} product={element} />
        })
    }

    useEffect(() => {
        if (token) {
            onInitPage({ token })
        }
    }, [onInitPage, token])

    return (
        <div className={classes.Favorites}>
            {auth}
            <h3 className={classes.FavoriteTitle}>Lista de Favoritos</h3>
            <div className={classes.FavoriteProducts}>{productsList}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        products: state.products,
    }
}

export default connect(mapStateToProps)(Favorites)
