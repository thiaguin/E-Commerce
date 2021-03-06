import React, { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import classes from './Products.module.css'
import ProductCard from '../../../components/ProductCard/ProductCard'
import Pagination from '../Pagination/Pagination'
import * as actions from '../../../store/actions/index'
import { connect, useDispatch } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'

const Products = (props) => {
    const dispatch = useDispatch()

    const title = props.products?.query?.title
    const count = props?.products?.count
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)

    const initProductsSearch = useCallback((params) => dispatch(actions.getProducts(params)), [dispatch])
    const countFounded = count ? <p>({count} produtos encontrados)</p> : null

    const orderOptions = [
        { value: 'Novidades', label: 'Novidades', query: { 'order[field]': 'createdAt', 'order[direction]': 'DESC' } },
        { value: 'Maior Preço', label: 'Maior Preço', query: { 'order[field]': 'price' } },
        { value: 'Menor Preço', label: 'Menor Preço', query: { 'order[field]': 'price', 'order[direction]': 'ASC' } },
        { value: 'Mais Vendidos', label: 'Mais Vendidos', query: { 'order[field]': 'saleQuantity' } },
        { value: 'Melhores Avaliados', label: 'Melhores Avaliados', query: { 'order[field]': 'rating' } },
    ]

    const itemsPerPageOptions = [
        { value: '10', label: '10', query: { take: 10 } },
        { value: '20', label: '20', query: { take: 20 } },
        { value: '30', label: '30', query: { take: 30 } },
        { value: '50', label: '50', query: { take: 50 } },
    ]

    const orderSelectHandler = (selectedOption) => {
        props.onAddQuery(selectedOption.query)
    }

    const changePageHanlder = (newPage) => {
        setPage(newPage)
        props.onAddQuery({ page: newPage })
    }

    const itemsPerPageSelectHandler = (selectedOption) => {
        setPage(1)
        setItemsPerPage(selectedOption.value)
        props.onAddQuery(selectedOption.query)
    }

    const { query } = props.products

    useEffect(() => {
        const search = { params: { ...query, take: itemsPerPage, page: page - 1 } }
        initProductsSearch(search)
    }, [initProductsSearch, itemsPerPage, page, query])

    let productsList = null

    if (props.products.count > 0) {
        const { products } = props.products
        productsList = products.map((element) => {
            return <ProductCard isFull={true} key={element.id} product={element} />
        })
    }
    const pagination = (
        <Pagination click={changePageHanlder} count={props.products.count} current={page} itemsPerPage={itemsPerPage} />
    )

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
                    options={orderOptions}
                    placeholder="Selecione..."
                    className={classes.Select}
                />
                <h6>Quantidade</h6>
                <Select
                    onChange={itemsPerPageSelectHandler}
                    options={itemsPerPageOptions}
                    placeholder={itemsPerPage}
                    className={classes.SelectQuantity}
                />
            </div>
            {props.products?.loading ? <Spinner className="LoaderFetchProducts" /> : productsList}
            {!props.products?.loading && props.products.count > 0 && pagination}
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
