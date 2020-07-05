import React, { useCallback, useEffect } from 'react'
import classes from './Filters.module.css'
import Filter from './Filter/Filter'
import FilterRating from './Filter/FilterRating'
import { connect, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions/index'

const Filters = (props) => {
    const dispatch = useDispatch()

    const getCategoriesDepartment = useCallback((params) => dispatch(actions.getCategories(params)), [dispatch])
    const getBrandsFilter = useCallback((params) => dispatch(actions.getBrandsFilter(params)), [dispatch])
    const getMaxPrice = useCallback((params) => dispatch(actions.getMaxPrice(params)), [dispatch])

    const departmentId = props.products?.query?.department
    const categoryId = props.products?.query?.category
    const brandId = props.products?.query?.brand
    const rating = props.products?.query?.rating
    const priceQuery = props.products?.query?.['price[min]'] || props.products?.query?.['price[max]']

    const minPrice = 0
    const maxPrice = props.navigation?.maxPrice ? Math.ceil(props.navigation?.maxPrice / 100) : 0

    const query = props.products?.query
    const filters = props.navigation?.filters?.map((element, index) => ({ ...element, id: index }))

    const department = {
        name: props.navigation?.departments?.title,
        departments: props.navigation?.departments?.departmentList,
    }

    const category = {
        name: 'Categorias',
        categories: props.navigation?.departmentCategories?.[0]?.categories,
    }

    const brand = {
        name: 'Marcas',
        brands: props.navigation?.brands,
    }

    const price: { name: string; prices: any[] } = {
        name: 'Preço',
        prices: [],
    }

    const diffPrice = maxPrice - minPrice
    const priceIntervals = diffPrice / 5

    let currentMinPrice = Math.ceil(minPrice / 100)

    for (let i = 0; i < 5; i++) {
        const query = { min: currentMinPrice * 100, max: (currentMinPrice + priceIntervals) * 100 }
        const min = currentMinPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        const max = (currentMinPrice + priceIntervals).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        const props = { name: `${min} - ${max}`, id: i, query }

        price.prices.push(props)
        currentMinPrice += priceIntervals
    }

    useEffect(() => {
        if (departmentId && !categoryId) {
            getCategoriesDepartment({ id: departmentId })
        }
    }, [getCategoriesDepartment, categoryId, departmentId])

    useEffect(() => {
        if (departmentId && !brandId) {
            const entity = categoryId ? 'categories' : 'departments'
            const entityId = categoryId || departmentId
            getBrandsFilter({ entity, entityId })
        }
    }, [brandId, categoryId, departmentId, getBrandsFilter])

    useEffect(() => {
        if (departmentId && !priceQuery) {
            getMaxPrice(query)
        }
    }, [departmentId, getMaxPrice, priceQuery, query])

    const clickDepartmentHandler = ({ id, name }) => {
        props.onSetFilters([...filters, { values: ['department'], name }])
        props.onAddFilter({ department: id })
    }

    const clickCategoriesHandler = ({ id, name }) => {
        props.onSetFilters([...filters, { values: ['category'], name }])
        props.onAddFilter({ category: id })
    }

    const clickBrandsHandler = ({ id, name }) => {
        props.onSetFilters([...filters, { values: ['brand'], name }])
        props.onAddFilter({ brand: id })
    }

    const clickRatingHandler = (stars, name) => {
        props.onSetFilters([...filters, { values: ['rating'], name }])
        props.onAddFilter({ rating: stars })
    }

    const clickPriceHandler = ({ query, name }) => {
        props.onSetFilters([...filters, { values: ['price[min]', 'price[max]'], name }])
        props.onAddFilter({ 'price[min]': query.min, 'price[max]': query.max })
    }

    const clickSelectedHanlder = (element) => {
        const selected = [...filters]
        const updated = selected.filter((item) => element.name !== item.name)
        props.onSetFilters(updated)
        props.onRemoveFilter(element.values)
    }

    return (
        <div className={classes.Filters}>
            <h1>Filtros</h1>
            {filters && filters.length > 0 && (
                <Filter selected={true} click={clickSelectedHanlder} title="Selecionados" items={filters} />
            )}
            {!departmentId && (
                <Filter click={clickDepartmentHandler} title={department.name} items={department.departments} />
            )}
            {!categoryId && departmentId && (
                <Filter
                    click={clickCategoriesHandler}
                    scroll={true}
                    title={category.name}
                    items={category.categories}
                />
            )}
            {!brandId && departmentId && brand.brands.length > 0 && (
                <Filter click={clickBrandsHandler} scroll={true} title={brand.name} items={brand.brands} />
            )}
            {!rating && departmentId && <FilterRating click={clickRatingHandler} />}
            {!priceQuery && departmentId && maxPrice > 100 && (
                <Filter click={clickPriceHandler} title={price.name} items={price.prices} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        products: state.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveFilter: (query) => dispatch(actions.removeProductQuery(query)),
        onAddFilter: (query) => dispatch(actions.addProductQuery(query)),
        onSetFilters: (value) => dispatch(actions.setFilters(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
