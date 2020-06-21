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

    const departmentId = props.products?.query?.department
    const categoryId = props.products?.query?.category
    const brandId = props.products?.query?.brand

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

    const price: { name: string; prices: any[] } = {
        name: 'Preço',
        prices: [],
    }

    const minPrice = 350
    const maxPrice = 5000

    const diffPrice = maxPrice - minPrice
    const priceIntervals = diffPrice / 5

    let currentMinPrice = minPrice

    for (let i = 0; i < 5; i++) {
        const min = currentMinPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        const max = (currentMinPrice + priceIntervals).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        const abc = { name: `${min} - ${max}`, id: i }
        price.prices.push(abc)
        currentMinPrice += priceIntervals
    }

    const hasRating = false
    const hasPrice = false

    const clickDepartmentHandler = (id) => {
        props.onAddFilter({ department: id })
    }

    const clickCategoriesHandler = (id) => {
        props.onAddFilter({ category: id })
    }

    const clickBrandsHandler = (id) => {
        props.onAddFilter({ brand: id })
    }

    const filterPrice = !hasPrice && departmentId ? <Filter title={price.name} items={price.prices} /> : null

    return (
        <div className={classes.Filters}>
            <h1>Filtros</h1>
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
            {!brandId && departmentId && (
                <Filter click={clickBrandsHandler} scroll={true} title={brand.name} items={brand.brands} />
            )}
            {!hasRating && departmentId && <FilterRating />}
            {filterPrice}
            <Filter></Filter>
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
        onAddFilter: (query) => dispatch(actions.addProductQuery(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
