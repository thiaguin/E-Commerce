import React, { useCallback, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import classes from './Product.module.css'
import ImageGallery from 'react-image-gallery'
import Aux from '../hoc/Aux'
import StarRatings from 'react-star-ratings'
import heartIcon from '../../assets/heart.svg'
import carIcon from '../../assets/car.svg'
import * as actions from '../../store/actions/index'
import 'react-image-gallery/styles/css/image-gallery.css'
import { HashLink as Link } from 'react-router-hash-link'

const Product = (props) => {
    const dispatch = useDispatch()
    const initProduct = useCallback((params) => dispatch(actions.getProduct(params)), [dispatch])
    const productId = props.match.params.id
    const product = props.product?.data

    const images = product?.photos?.map((photo) => {
        const imageSrc = `${process.env.REACT_APP_BASE_URL}/photos/${photo.id}`
        return { original: imageSrc, thumbnail: imageSrc }
    })

    const ratingSettings = {
        starEmptyColor: '#A9A9A9',
        starRatedColor: '#CCCC00',
        rating: 0.05 * product?.rating,
        starDimension: '30px',
        starSpacing: '3px',
    }

    const imageSettings = {
        thumbnailPosition: 'left',
        showNav: false,
        showPlayButton: false,
        items: images,
    }

    const getPrice = (price) => {
        const value = price / 100
        const result = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        return result
    }

    const priceWithDiscount = () => {
        const forDiscount = (100 - product.discount) / 100
        const priceDiscounted = Math.round(product.price * forDiscount)

        return getPrice(priceDiscounted)
    }

    const saving = product && (product.price * product.discount) / 100

    useEffect(() => {
        initProduct({ id: productId })
    }, [initProduct, productId])

    return (
        <div>
            {product && (
                <Aux>
                    <h1 className={classes.ProductTitle}>{product.title}</h1>
                    <div id="card" className={classes.Product}>
                        <div className={classes.Images}>{images && <ImageGallery {...imageSettings} />}</div>
                        <div className={classes.Card}>
                            <div style={{ display: 'block' }}>
                                <StarRatings {...ratingSettings} />
                                <p>
                                    {product.ratingQuantity} {product.ratingQuantity === 1 ? 'Avaliação' : 'Avaliações'}
                                </p>
                            </div>
                            {product.discount > 0 && (
                                <Aux>
                                    <h4>{getPrice(product.price)}</h4>
                                    <h3>Economia de {getPrice(saving)}</h3>
                                </Aux>
                            )}
                            <h2>{priceWithDiscount()}</h2>
                            <Link style={{ textDecoration: 'none' }} to="#description">
                                <p className={classes.DescriptionCard}>{product.description}</p>
                            </Link>
                            <button className={classes.Car}>
                                <p>Adicionar ao carrinho</p>
                                <img src={carIcon} alt="car" />
                            </button>
                            <button className={classes.Heart}>
                                <p>Adicionar aos favoritos</p>
                                <img src={heartIcon} alt="heart" />
                            </button>
                        </div>
                    </div>
                    <h5 className={classes.ProductTag} id="description">
                        Descrição
                    </h5>
                    <p className={classes.Description}>{product.description}</p>
                    <h5 className={classes.ProductTag} id="description">
                        Informação Técnica //todo
                    </h5>
                </Aux>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
    }
}
export default connect(mapStateToProps)(Product)
