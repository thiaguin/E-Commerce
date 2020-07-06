import React, { useEffect, useCallback } from 'react'
import * as ResponsiveCarousel from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import classes from './Highlights.module.css'
import { useDispatch, connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import Aux from '../../../components/hoc/Aux'
import * as actions from '../../../store/actions/index'

const Tooltip: React.HTMLElement = ReactTooltip
const Carousel: React.Component = ResponsiveCarousel.Carousel

const Highlights = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const initHighlights = useCallback((params) => dispatch(actions.getHighlights()), [dispatch])

    const settings = {
        interval: 3500,
        transitionTime: 500,
        autoPlay: true,
        showArrows: true,
        showThumbs: false,
        infiniteLoop: true,
        showStatus: false,
    }

    useEffect(() => {
        initHighlights()
    }, [initHighlights])

    const onSelectHighlightHandler = (query) => {
        props.onSelectItem(query)
        history.push('/products')
    }

    const highlights = props.navigation?.highlights.map((element) => {
        const imageUrl = `${process.env.REACT_APP_BASE_URL}/highlights/photo/${element.id}`
        return (
            <Aux key={element.id}>
                <div
                    data-tip={element.description}
                    className={classes.Highlight}
                    onClick={() => onSelectHighlightHandler(element.query)}
                >
                    <img src={imageUrl} alt="main"></img>
                </div>
                <Tooltip type="light" backgroundColor="#f0f0d0" />
            </Aux>
        )
    })

    return (
        <div className={classes.Highlights}>
            {props.navigation?.highlights?.length > 0 && <Carousel {...settings}>{highlights}</Carousel>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectItem: (query) => dispatch(actions.setProductsQuery(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Highlights)
