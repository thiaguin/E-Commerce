import React, { useEffect } from 'react'
import classes from './Order.module.css'
import { connect } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/Spinner/Spinner'
import Aux from '../../components/hoc/Aux'

const Order = (props) => {
    const products = props.order?.products
    const history = useHistory()

    const backClickHandler = () => {
        history.goBack()
    }

    const getProducsTotalPrice = () => {
        const total = products.reduce((sum, product) => {
            return sum + product.price * product.quantity
        }, 0)

        return total
    }

    const getFreightPrice = () => {
        return props.order?.freight?.price || 0
    }

    const getPriceFormated = (price) => {
        return (price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

    const getCards = () => {
        const cardOptions = [
            { title: 'Preço dos Produtos', value: getPriceFormated(getProducsTotalPrice()) },
            { title: 'Preço do Frete', value: getPriceFormated(getFreightPrice()) },
            { title: 'Total', value: getPriceFormated(getProducsTotalPrice() + getFreightPrice()) },
        ]

        return cardOptions.map((element, index) => {
            return (
                <div key={index} className={classes.OrderCard}>
                    <h3>{element.title}</h3>
                    <h2>{element.value}</h2>
                </div>
            )
        })
    }

    useEffect(() => {
        if (products.length === 0) {
            history.goBack()
        }
    }, [history, products])

    const makeOrder = () => {
        const order = {
            products: props.order.products,
            freight: props.order.freight?.price,
            delivery: props.order.freight?.type,
            deliveryData: props.order.localization,
            productsTotalPrice: getProducsTotalPrice(),
            user: props.auth.userId,
        }

        props.onMakeOrder({ order, token: props.auth.token })
    }

    return (
        <div style={{ marginTop: '115px' }}>
            {props.order.postSuccess && <Redirect to="/shopping/order/success" />}
            {props.order.postErro && <Redirect to="/shopping/order/error" />}
            {props.order.postLoading ? (
                <div style={{ marginTop: '300px' }}>
                    <Spinner className="LoaderMakeOrder" />
                </div>
            ) : (
                <Aux>
                    <div className={classes.Order}>{getCards()}</div>
                    <div className={classes.OrderButton}>
                        <button onClick={backClickHandler}>Voltar</button>
                        <button onClick={makeOrder}>Comprar</button>
                    </div>
                </Aux>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMakeOrder: (value) => dispatch(actions.makerOrder(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
