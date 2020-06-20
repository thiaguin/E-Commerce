import React from 'react'
import Select from 'react-select'
import classes from './Products.module.css'
import ProductCard from '../../ProductCard/ProductCard'
const products = (props) => {
    const title = true ? <h4>props.title</h4> : null
    const count = true ? <p>(props.count produtos encontrados)</p> : null

    const options = [
        { value: 'Novidades', label: 'Novidades' },
        { value: 'Maior Preço', label: 'Maior Preço' },
        { value: 'Menor Preço', label: 'Menor Preço' },
        { value: 'Mais Vendidos', label: 'Mais Vendidos' },
        { value: 'Melhores Avaliados', label: 'Melhores Avaliados' },
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
                <div style={{ height: '60px' }}>
                    {title}
                    {count}
                </div>
            )}
            <div>
                <h6>Ordenar</h6>
                <Select options={options} placeholder="Selecione..." className={classes.Select} />
            </div>
            <ProductCard isFull={true} key="1" padding="0 20px" />
            <ProductCard isFull={true} key="2" padding="0 20px" />
            <ProductCard isFull={true} key="4" padding="0 20px" />
            <ProductCard isFull={true} key="3" padding="0 20px" />
            <ProductCard isFull={true} key="5" padding="0 20px" />
            <ProductCard isFull={true} key="6" padding="0 20px" />
            <ProductCard isFull={true} key="1a4" padding="0 20px" />
            <ProductCard isFull={true} key="a2" padding="0 20px" />
            <ProductCard isFull={true} key="sa4" padding="0 20px" />
            <ProductCard isFull={true} key="asd4" padding="0 20px" />
            <ProductCard isFull={true} key="1d4" padding="0 20px" />
            <ProductCard isFull={true} key="2c" padding="0 20px" />
            <ProductCard isFull={true} key="4zcx" padding="0 20px" />
            <ProductCard isFull={true} key="1zxv4" padding="0 20px" />
            <ProductCard isFull={true} key="vz2" padding="0 20px" />
            <ProductCard isFull={true} key="4vzx" padding="0 20px" />
            <ProductCard isFull={true} key="1xvz4" padding="0 20px" />
            <ProductCard isFull={true} key="zvx2" padding="0 20px" />
            <ProductCard isFull={true} key="4zzxv" padding="0 20px" />
            <ProductCard isFull={true} key="4zxv" padding="0 20px" />
        </div>
    )
}

export default products
