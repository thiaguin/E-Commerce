import React from 'react'
import classes from './Filters.module.css'
import Filter from './Filter/Filter'
import FilterRating from './Filter/FilterRating'

const Filters = (props) => {
    const department = {
        name: 'Departamento',
        departments: [
            { name: 'Futebol', id: '1' },
            { name: 'Esportivo', id: '2' },
            { name: 'Informatica', id: '3' },
            { name: 'dep4', id: '4' },
            { name: 'dep5', id: '5' },
            { name: 'dep6', id: '6' },
        ],
    }

    const category = {
        name: 'Category',
        categories: [
            { name: 'chuteira', id: '1' },
            { name: 'camisa de time', id: '2' },
            { name: 'boné', id: '3' },
            { name: 'cat4', id: '4' },
            { name: 'cat5', id: '5' },
        ],
    }

    const brand = {
        name: 'Marca',
        categories: [
            { name: 'Adibas', id: '1' },
            { name: 'Nice', id: '2' },
            { name: 'Pumma', id: '3' },
            { name: 'cat4', id: '4' },
            { name: 'cat5', id: '5' },
            { name: 'cat6', id: '6' },
            { name: 'cat7', id: '7' },
            { name: 'cat8', id: '8' },
        ],
    }

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

    const hasDepartment = true
    const hasCategory = false
    const hasBrand = false
    const hasRating = false
    const hasPrice = false
    const filterDepartment = !hasDepartment ? <Filter title={department.name} items={department.departments} /> : null
    const filterCategories =
        !hasCategory && hasDepartment ? (
            <Filter scroll={true} title={category.name} items={category.categories} />
        ) : null
    const filterBrand =
        !hasBrand && hasDepartment ? <Filter scroll={true} title={brand.name} items={brand.categories} /> : null
    const filterPrice = !hasPrice && hasDepartment ? <Filter title={price.name} items={price.prices} /> : null
    return (
        <div className={classes.Filters}>
            <h1>Filtros</h1>
            {filterDepartment}
            {filterCategories}
            {filterBrand}
            {!hasRating && hasDepartment && <FilterRating />}
            {filterPrice}
            <Filter></Filter>
        </div>
    )
}

export default Filters
