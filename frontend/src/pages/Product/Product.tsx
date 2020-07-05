import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import classes from './Product.module.css'
import ImageGallery from 'react-image-gallery'
import Aux from '../../components/hoc/Aux'
import StarRatings from 'react-star-ratings'
import heartIcon from '../../assets/heart.svg'
import carIcon from '../../assets/car.svg'
import Popup from '../../components/Popup/Popup'
import { HashLink as Link } from 'react-router-hash-link'
import * as actions from '../../store/actions/index'
import 'react-image-gallery/styles/css/image-gallery.css'
import { useHistory } from 'react-router-dom'

const Product = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const initProduct = useCallback((params) => dispatch(actions.getProduct(params)), [dispatch])
    const productId = props.match.params.id
    const product = props.product?.data
    const token = props.auth?.token
    const propFavorite = props.product?.favorite?.[product?.id]
    const [popup, setPopup] = useState(null)

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

    const getFavoriteStatus = () => {
        let favoriteHandler = product.isFavorite ? 'REMOVE' : 'ADD'

        if (propFavorite) {
            favoriteHandler = propFavorite === 'ADDED' ? 'REMOVE' : 'ADD'
        }

        return favoriteHandler
    }

    useEffect(() => {
        initProduct({ id: productId, token })
    }, [initProduct, productId, token])

    useEffect(() => {
        if (propFavorite) {
            const type = propFavorite === 'ADDED' ? 'ADDED_FAVORITE' : 'REMOVED_FAVORITE'
            setPopup(<Popup message={type} />)
        } else {
            setPopup(null)
        }
    }, [propFavorite])

    const technicianInformation = () => {
        const result: React.HTMLElement[] = []

        for (const key in product.technicalInformation) {
            result.push(
                <li className={classes.RowTechnicalInformation} key={key}>
                    <p className={classes.TitleTechnicalInformation}>{key}</p>
                    <p className={classes.ValueTechnicalInformation}>{product.technicalInformation[key]}</p>
                </li>
            )
        }
        return result
    }

    const addOnCartHandler = () => {
        const shoppingCart = localStorage.getItem('shoppingCart')

        const cartList = shoppingCart?.split(',')
        const cartListSet = cartList?.filter((element) => element !== `${product.id}`)
        const cartUpdated = cartListSet ? [...cartListSet, product.id] : [product.id]

        localStorage.setItem('shoppingCart', cartUpdated.join(','))
        history.push('/shopping')
    }

    const onAddFavoriteHandler = () => {
        const token = props.auth?.token

        if (!token) {
            props.onSetRedirectPath('/wishes')
            history.push('/wishes')
        }

        const favoriteStatus = getFavoriteStatus()
        const favoriteHandler = favoriteStatus === 'REMOVE' ? props.onRemoveFavorite : props.onAddFavorite

        favoriteHandler({ id: product.id, token })
    }

    return (
        <Aux>
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
                                        {product.ratingQuantity}{' '}
                                        {product.ratingQuantity === 1 ? 'Avaliação' : 'Avaliações'}
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
                                <button onClick={addOnCartHandler} className={classes.Car}>
                                    <p>Adicionar ao carrinho</p>
                                    <img src={carIcon} alt="car" />
                                </button>
                                <button onClick={onAddFavoriteHandler} className={classes.Heart}>
                                    <p>
                                        {getFavoriteStatus() === 'REMOVE'
                                            ? 'Remover dos favoritos'
                                            : 'Adicionar aos favoritos'}
                                    </p>
                                    <img src={heartIcon} alt="heart" />
                                </button>
                            </div>
                        </div>
                        <h5 className={classes.ProductTag} id="description">
                            Descrição
                        </h5>
                        <p className={classes.Description}>{product.description}</p>
                        <h5 className={classes.ProductTag} id="description">
                            Informação Técnica
                        </h5>
                        <ul>{technicianInformation()}</ul>
                    </Aux>
                )}
            </div>
            {popup}
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        product: state.product,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
        onAddFavorite: (value) => dispatch(actions.addFavorite(value)),
        onRemoveFavorite: (value) => dispatch(actions.removeFavorite(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
