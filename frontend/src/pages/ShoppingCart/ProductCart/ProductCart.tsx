import React from 'react'
import crashSvg from '../../../assets/crash.svg'
import Aux from '../../../components/hoc/Aux'
import classes from './ProductCart.module.css'

const ProductCart = (props) => {
    const product = props.product
    const quantity = props.itemQuantity?.[product.id] || 1

    const image = `${process.env.REACT_APP_BASE_URL}/photos/filename/${product.filename}`

    const inputChangeHandler = (event) => {
        const value = event.target.value

        if ((value <= product.stockQuantity && value > 0) || value === '') {
            props.setItemQuantity({ ...props.itemQuantity, [product.id]: value })
            props.setTotalPrice({ ...props.totalPrice, [product.id]: props.currentTotalPrice })
        }
    }

    const removeHandler = () => {
        props.remove(product.id)
    }

    const classesName = [classes.Cart]
    props.isLast && classesName.push(classes.Last)

    return (
        <Aux>
            <div className={classesName.join(' ')}>
                <div onClick={removeHandler} className={classes.Remove}>
                    <h6>Remover</h6>
                    <img src={crashSvg} alt="remove" />
                </div>
                <div style={{ marginTop: '30px' }}>
                    <img src={image} alt="productPhoto" />
                    <div className={classes.CartInfo}>
                        <h3>{product.title}</h3>
                        <h4>Valor: {props.formatedPrice}</h4>
                    </div>
                    <div className={classes.Input}>
                        <h5>Quantidade (Máxima: {props.product.stockQuantity})</h5>
                        <input
                            value={quantity}
                            type="number"
                            min="1"
                            max={product.stockQuantity}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>
                    <div className={classes.Price}>
                        <h3>Total</h3>
                        <h4>{props.currentTotalPrice}</h4>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default ProductCart
