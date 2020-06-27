import React, { useCallback, useEffect, useState } from 'react'
import classes from './ShoppingCart.module.css'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Aux from '../hoc/Aux'
import * as actions from '../../store/actions/index'
import ProductCart from './ProductCart/ProductCart'

const ShoppingCart = (props) => {
    const dispatch = useDispatch()

    const history = useHistory()

    const [itemQuantity, setItemQuantity] = useState({})
    const [totalPrice, setTotalPrice] = useState({})

    const initProducts = useCallback((params) => dispatch(actions.getProducts(params)), [dispatch])

    const cart = localStorage.getItem('shoppingCart')

    const emptyCart = 'Você ainda não adicionou nenhum produto no carrinho!'

    const cartIsEmpty = !cart || cart?.length === 0

    const onRemoveHandler = (productId) => {
        const products = cart?.split(',')
        const productsUpdated = products?.filter((element) => element !== `${productId}`) || []
        const quantities = { ...itemQuantity }
        const prices = { ...totalPrice }

        delete quantities[productId]
        delete prices[productId]

        setItemQuantity(quantities)
        setTotalPrice(prices)

        localStorage.setItem('shoppingCart', productsUpdated.join(','))
    }

    const onContinueClickHandler = () => {
        props.onClearQuery()
        history.push('/products')
    }

    const productsList = () => {
        const products = props.products?.products
        if (products?.length > 0) {
            return products.map((product, index) => {
                const quantity = itemQuantity?.[product.id] || 1
                const currentPrice = Math.round((product.price * (100 - product.discount)) / 100)
                const formatedPrice = (currentPrice / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })
                const currentTotalPrice = ((currentPrice * quantity) / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                })

                return (
                    <div key={index} style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <ProductCart
                            isLast={index + 1 === products.length}
                            number={index + 1}
                            formatedPrice={formatedPrice}
                            currentTotalPrice={currentTotalPrice}
                            product={product}
                            itemQuantity={itemQuantity}
                            setItemQuantity={setItemQuantity}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                            remove={onRemoveHandler}
                        />
                    </div>
                )
            })
        }
    }

    useEffect(() => {
        const products = cart?.split(',')
        if (products) {
            const productsId = products?.map((element) => +element)
            initProducts({ params: { id: productsId } })
        }
    }, [initProducts, cart])

    return (
        <div className={classes.ShoppingCart}>
            {cartIsEmpty ? (
                <Aux>
                    <div className={classes.EmptyCart}>
                        <h1>{emptyCart}</h1>
                        <button className={classes.Back} onClick={onContinueClickHandler}>
                            <p>Ver Produtos</p>
                        </button>
                    </div>
                </Aux>
            ) : (
                <Aux>
                    <h2>Carrinho</h2>
                    {productsList()}
                    <div className={classes.Buttons}>
                        <button onClick={onContinueClickHandler} className={classes.Continue}>
                            <p>Continuar Comprando</p>
                        </button>
                        <button className={classes.Finish}>
                            <p>Finalizar Compra</p>
                        </button>
                    </div>
                </Aux>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClearQuery: () => dispatch(actions.setProductsQuery({})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
