import React, { useEffect, useCallback } from 'react'
import classes from './OrderPage.module.css'
import { useDispatch, connect } from 'react-redux'
import StarRatings from 'react-star-ratings'
import * as actions from '../../../store/actions/index'

const OrderPage = (props) => {
    const dispatch = useDispatch()

    const onInitPage = useCallback((value) => dispatch(actions.getOrder(value)), [dispatch])
    const orderId = props?.match?.params?.id
    const token = props.auth?.token
    const orderProduct = props.orders?.order?.productOrder || []
    const evaluateProduct = props.order?.evaluate

    const evaluateProductHandler = (element, value) => {
        const newEvaluate = {
            productId: element.productId,
            token: props.auth?.token,
            body: {
                productOrderId: element.id,
                rating: 20 * value,
            },
        }

        props.onEvaluateProduct(newEvaluate)
    }

    const ratingSettings = (element) => {
        const hasEvaluate = evaluateProduct?.filter((current) => {
            return current.productId === element.productId && current.productOrderId === element.id
        })

        const currentEvaluate = hasEvaluate && hasEvaluate.length > 0 ? hasEvaluate[0].rating : element.evaluate

        const result: any = {
            starEmptyColor: '#A9A9A9',
            starRatedColor: '#CCCC00',
            rating: 0.05 * currentEvaluate,
            starDimension: '20px',
            starSpacing: '2px',
            starHoverColor: '#CCCC00',
        }

        if (element.evaluate === 0 && !(hasEvaluate && hasEvaluate.length > 0)) {
            result.changeRating = (value) => evaluateProductHandler(element, value)
        }

        return result
    }

    const products = orderProduct.map((element, index) => {
        const product = element?.product
        const settings = ratingSettings(element)

        return (
            <div key={index} className={classes.OrderProduct}>
                <img src={`${process.env.REACT_APP_BASE_URL}/photos/filename/${product.filename}`} alt="product" />
                <div className={classes.ProductTitle}>
                    <h3>{product.title}</h3>
                    <h4>Quantidade: {element.productQuantity}</h4>
                </div>
                <div className={classes.ProductPrice}>
                    <h3>Preço</h3>
                    <h3>
                        {((element.productPrice * element.productQuantity) / 100).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </h3>
                </div>
                <div className={classes.ProductEvaluate}>
                    <h3>{element.evaluate === 0 ? 'Avaliar' : 'Sua Avaliação'}</h3>
                    <StarRatings {...settings} />
                </div>
            </div>
        )
    })

    const freightPrice = props.orders?.order?.freight

    const productsTotalPrice = props.orders?.order?.productsTotalPrice

    const convertPrice = (price) => {
        return price && (price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

    const getTotalPrice = () => {
        return freightPrice && productsTotalPrice && freightPrice + productsTotalPrice
    }
    useEffect(() => {
        if (orderId && token) {
            onInitPage({ orderId, token })
        }
    }, [onInitPage, orderId, token])

    return (
        <div className={classes.OrderPage}>
            <h1>Pedido número {props?.match?.params?.id}</h1>
            {products}
            <div style={{ textAlign: 'center' }}>
                <div className={classes.PriceCard}>
                    <h3>Preço do Frete</h3>
                    <h4>{convertPrice(freightPrice)}</h4>
                </div>
                <div className={classes.PriceCard}>
                    <h3>Preço dos Produtos</h3>
                    <h4>{convertPrice(productsTotalPrice)}</h4>
                </div>
                <div className={classes.PriceCard}>
                    <h3>Preço Total</h3>
                    <h4>{convertPrice(getTotalPrice())}</h4>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        orders: state.orders,
        order: state.order,
    }
}

const mapStateToDispatch = (dispatch) => {
    return {
        onEvaluateProduct: (value) => dispatch(actions.evaluateProduct(value)),
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(OrderPage)
