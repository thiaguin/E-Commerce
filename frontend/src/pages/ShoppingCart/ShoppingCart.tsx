import React, { useCallback, useEffect, useState } from 'react'
import classes from './ShoppingCart.module.css'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Aux from '../../components/hoc/Aux'
import * as actions from '../../store/actions/index'
import ProductCart from './ProductCart/ProductCart'
import Select from 'react-select'

const ShoppingCart = (props) => {
    const dispatch = useDispatch()

    const history = useHistory()

    const [itemQuantity, setItemQuantity] = useState({})
    const [totalPrice, setTotalPrice] = useState({})
    const [freight, setFreight] = useState('NONE')
    const [finishDisabled, setFinishDisabled] = useState(true)
    const [cep, setCep] = useState({ value: '', label: '', valid: false })

    const initProducts = useCallback((params) => dispatch(actions.getProducts(params)), [dispatch])
    const authCheck = useCallback(() => dispatch(actions.authCheck()), [dispatch])

    const cart = localStorage.getItem('shoppingCart')

    const emptyCart = 'Você ainda não adicionou nenhum produto no carrinho!'
    const invalidCep = 'Por favor digite um CEP válido'

    const localization = props.order?.localization

    const cartIsEmpty = !cart || cart?.length === 0

    const orderOptions = [
        { value: 'CHEAPEST', label: 'Barata' },
        { value: 'COMMOM', label: 'Normal' },
        { value: 'FASTEST', label: 'Expressa' },
    ]

    const freightValues = {
        NONE: 0,
        FASTEST: 10000,
        COMMOM: 5000,
        CHEAPEST: 1000,
    }

    const freighClasses = finishDisabled ? [classes.Freight, classes.FreightMissed] : [classes.Freight]

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

    const continueClickHandler = () => {
        props.onClearQuery()
        history.push('/products')
    }

    const selectChangeHandler = (selected) => {
        setFreight(selected.value)

        if (['FASTEST', 'COMMOM', 'CHEAPEST'].includes(selected.value)) {
            setFinishDisabled(false)
        }
    }

    const inputChangeHandler = (event) => {
        let label = event?.target?.value

        const isNumber = /^\d+$/
        const lastChar = label.substr(-1)

        if (label.length < 10) {
            if (label && isNumber.test(lastChar)) {
                const [first, second] = label.split('-')
                const value = second ? [first, second].join('') : first

                if (label.length === 5) {
                    label = label.length < cep.label.length ? label.substring(0, label.length - 1) : label + '-'
                }

                setCep({ value, label, valid: label.length === 9 })
            }

            if (lastChar === '-') {
                const [value] = label.split('-')
                setCep({ ...cep, value: value, label: `${value}-` })
            }

            if (label === '') {
                setCep({ valid: false, value: '', label: '' })
            }
        }
    }

    const clickSearchCepHandler = () => {
        props.onGetLocalization(cep.value)
    }

    const onFinishClickHandler = () => {
        const products: any[] = []
        const propsProducts = props.products?.products
        const path = props.auth?.token ? '/shopping/order' : '/auth'
        const freightType = { type: freight, price: freightValues[freight] }

        for (const propsProduct of propsProducts) {
            const product = {
                id: propsProduct.id,
                title: propsProduct.title,
                quantity: itemQuantity[propsProduct.id] || 1,
                price: Math.round((propsProduct.price * (100 - propsProduct.discount)) / 100),
            }

            products.push(product)
        }

        props.onFinishOrder()
        props.onSetRedirectPath('/shopping/order')
        props.onSetOrder({ freight: freightType, products })

        history.push(path)
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

    const getFreightPrice = (type) => {
        const value = (freightValues[type] || freightValues['NONE']) / 100

        return value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    useEffect(() => {
        authCheck()
    }, [authCheck])

    useEffect(() => {
        const products = cart?.split(',')
        if (products) {
            const productsId = products?.map((element) => +element)
            initProducts({ params: { id: productsId } })
        }
    }, [initProducts, cart])

    const cepLocalization = props.order?.localization?.erro ? (
        <h4>{invalidCep}</h4>
    ) : (
        <h4>
            {localization?.logradouro}, {localization?.bairro}
            <br />
            {localization?.localidade}, {localization?.uf} - {localization?.cep}
        </h4>
    )

    return (
        <div className={classes.ShoppingCart}>
            {cartIsEmpty ? (
                <Aux>
                    <div className={classes.EmptyCart}>
                        <h1>{emptyCart}</h1>
                        <button className={classes.Back} onClick={continueClickHandler}>
                            <p>Ver Produtos</p>
                        </button>
                    </div>
                </Aux>
            ) : (
                <Aux>
                    <h2>Carrinho</h2>
                    {productsList()}
                    <div className={classes.Cep}>
                        <div>
                            <h3>CEP</h3>
                            <input value={props.order?.localization?.cep || cep.label} onChange={inputChangeHandler} />
                            <button onClick={clickSearchCepHandler} disabled={!cep.valid}>
                                Pesquisar
                            </button>
                        </div>
                        {props.order.localization && cepLocalization}
                    </div>
                    {props.order.localization && !props.order.localization.erro && (
                        <div className={freighClasses.join(' ')}>
                            <div className={classes.FreightLeft}>
                                <h3>Frete</h3>
                                <Select
                                    onChange={selectChangeHandler}
                                    options={orderOptions}
                                    placeholder="Selecione..."
                                    className={classes.Select}
                                />
                            </div>
                            <h4>{getFreightPrice(freight)}</h4>
                        </div>
                    )}
                    <div className={classes.Buttons}>
                        <button onClick={continueClickHandler} className={classes.Continue}>
                            <p>Continuar Comprando</p>
                        </button>
                        <button
                            disabled={finishDisabled || !props.order.localization || props.order?.localization?.erro}
                            onClick={onFinishClickHandler}
                            className={classes.Finish}
                        >
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
        auth: state.auth,
        order: state.order,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClearQuery: () => dispatch(actions.setProductsQuery({})),
        onFinishOrder: () => dispatch(actions.setFinishingOrder()),
        onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
        onSetOrder: (value) => dispatch(actions.setOrder(value)),
        onGetLocalization: (value) => dispatch(actions.getLocalization(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
