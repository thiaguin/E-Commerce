import React, { useCallback, useEffect } from 'react'
import Select from 'react-select'
import classes from './Products.module.css'
import ProductCard from '../../ProductCard/ProductCard'
import * as actions from '../../../store/actions/index'
import { connect, useDispatch } from 'react-redux'

const Products = (props) => {
    const dispatch = useDispatch()

    const title = props.products?.query?.title
    const count = props?.products?.count

    const initProductsSearch = useCallback((params) => dispatch(actions.getProducts(params)), [dispatch])
    const countFounded = count ? <p>({count} produtos encontrados)</p> : null

    const options = [
        { value: 'Novidades', label: 'Novidades', query: { 'order[field]': 'createdAt', 'order[direction]': 'DESC' } },
        { value: 'Maior Preço', label: 'Maior Preço', query: { 'order[field]': 'price' } },
        { value: 'Menor Preço', label: 'Menor Preço', query: { 'order[field]': 'price', 'order[direction]': 'ASC' } },
        { value: 'Mais Vendidos', label: 'Mais Vendidos', query: { 'order[field]': 'saleQuantity' } },
        { value: 'Melhores Avaliados', label: 'Melhores Avaliados', query: { 'order[field]': 'rating' } },
    ]

    const orderSelectHandler = (selectedOption) => {
        props.onAddQuery(selectedOption.query)
    }

    const { query } = props.products

    useEffect(() => {
        const search = { params: { ...query, take: 20, page: 0 } }
        initProductsSearch(search)
    }, [initProductsSearch, query])

    let productsList = null

    if (props.products.count > 0) {
        const { products } = props.products
        productsList = products.map((element) => {
            return <ProductCard isFull={true} key={element.id} product={element} />
        })
    }

    return (
        <div className={classes.Products}>
            {title && (
                <div style={{ height: '60px' }}>
                    <h4>{title}</h4>
                    {countFounded}
                </div>
            )}
            <div>
                <h6>Ordenar</h6>
                <Select
                    onChange={orderSelectHandler}
                    options={options}
                    placeholder="Selecione..."
                    className={classes.Select}
                />
            </div>
            {productsList}
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
        onAddQuery: (query) => dispatch(actions.addProductQuery(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
