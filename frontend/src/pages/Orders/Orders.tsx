import React, { useCallback, useEffect } from 'react'
import classes from './Orders.module.css'
import { useDispatch, connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const Orders = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const onInitOrders = useCallback((token) => dispatch(actions.getOrders(token)), [dispatch])
    const token = props.auth?.token

    const onOrderNumberClick = (orderId) => {
        history.push(`/orders/show/${orderId}`)
    }

    useEffect(() => {
        if (token) {
            onInitOrders(token)
        }
    }, [onInitOrders, token])

    const orders = props.orders?.datas.map((element, index) => {
        return (
            <div key={index} className={classes.OrderRow}>
                <h4 className={classes.OrderNumber} onClick={() => onOrderNumberClick(element.id)}>
                    {element.id}
                </h4>
                <h4 style={{ width: '300px', textAlign: 'left' }}>
                    {element.deliveryData?.logradouro}
                    {element.deliveryData?.logradouro && ','}
                    {element.deliveryData?.bairro}
                    {(element.deliveryData?.logradouro || element.deliveryData?.bairro) && <br />}
                    {element.deliveryData?.localidade}, {element.deliveryData?.uf} - {element.deliveryData?.cep}
                </h4>
                <h4 style={{ width: '130px', textAlign: 'center' }}>
                    {moment(element.createdAt).format('DD/MM/YYYY')}
                </h4>
                <h4 style={{ width: '170px', textAlign: 'center' }}>
                    {(element.productsTotalPrice / 100).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </h4>
            </div>
        )
    })

    return (
        <div className={classes.Orders}>
            <h1>Pedidos</h1>
            <div style={{ marginTop: '30px', marginBottom: '10px' }} className={classes.OrderRow}>
                <h4 style={{ width: '150px', textAlign: 'left' }}>Número do Pedido</h4>
                <h4 style={{ width: '300px', textAlign: 'left' }}>Endereço de Entrega</h4>
                <h4 style={{ width: '130px', textAlign: 'center' }}>Data da Compra</h4>
                <h4 style={{ width: '170px', textAlign: 'center' }}>Preço Total</h4>
            </div>
            <div style={{ textAlign: 'center' }}>{orders}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(Orders)
