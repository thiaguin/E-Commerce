import React from 'react'
import Select from 'react-select'
import classes from './Products.module.css'
import ProductCard from '../../ProductCard/ProductCard'
const products = (props) => {
    const title = true ? <h4>props.title</h4> : null
    const count = true ? <p>(props.count produtos encontrados)</p> : null

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]

    // const products = [
    //     <ProductCard key="1" padding="0 20px" />,
    //     // <ProductCard key="2" padding="0 20px" />,
    //     // <ProductCard key="4" padding="0 20px" />,
    //     // <ProductCard key="51" padding="0 20px" />,
    //     // <ProductCard key="16" padding="0 20px" />,
    //     // <ProductCard key="17" padding="0 20px" />,
    //     // <ProductCard key="18" padding="0 20px" />,
    //     // <ProductCard key="19" padding="0 20px" />,
    //     // <ProductCard key="11" padding="0 20px" />,
    //     // <ProductCard key="12" padding="0 20px" />,
    //     // <ProductCard key="13" padding="0 20px" />,
    //     // <ProductCard key="14" padding="0 20px" />,
    // ]

    return (
        <div className={classes.Products}>
            {title && (
                <div>
                    {title}
                    {count}
                </div>
            )}
            <h6>Ordenar</h6>
            <Select options={options} className={classes.Select} />
            {/* <h6>Pages</h6>
            <Select options={options} className={classes.Select} /> */}
            <ProductCard key="14" padding="0 20px" />
            <ProductCard key="2" padding="0 20px" />
            <ProductCard key="4" padding="0 20px" />
            <ProductCard key="51" padding="0 20px" />
        </div>
    )
}

export default products
