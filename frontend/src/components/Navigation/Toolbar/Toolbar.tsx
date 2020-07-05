import React, { useState, useEffect } from 'react'
import classes from './Toolbar.module.css'
import SearchBar from './SearchBar/SearchBar'
import Logo from './Logo/Logo'
import Dialog from './Dialog/Dialog'
import ToolbarItem from './ToolbarItem/ToolbarItem'
import heartIcon from '../../../assets/heart.svg'
import carIcon from '../../../assets/car.svg'
import logoutIcon from '../../../assets/logout.svg'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

const Toolbar = (props) => {
    const history = useHistory()
    const { onAuthCheck } = props
    const [productSearch, setProductSearch] = useState('')

    const inputHandlerChange = (event) => {
        const { value } = event.target
        setProductSearch(value)
    }

    const dialogClickHandle = (route) => {
        history.push(route)
    }

    const toolbarItemClickHanler = (item) => {
        const route = item === 'car' ? '/shopping' : '/wishes'
        if (item === 'heart' && !props.auth?.token) props.onSetRedirectPath(route)

        history.push(route)
    }

    const onSubmitHandler = () => {
        setProductSearch('')
    }

    const onLogoClickHandler = () => {
        props.onSetFilters([])
        props.onResetProductsQuery()
        history.push('/')
    }

    const onLogoutClickHandler = () => {
        props.onLogout()
        history.push('/')
    }

    useEffect(() => {
        onAuthCheck()
    }, [onAuthCheck])

    return (
        <div className={classes.Toolbar}>
            <Logo click={onLogoClickHandler} />
            <SearchBar submit={onSubmitHandler} value={productSearch} changed={(event) => inputHandlerChange(event)} />
            <Dialog auth={props.auth} click={dialogClickHandle} />
            <ToolbarItem dataTip="Favoritos" icon={heartIcon} click={() => toolbarItemClickHanler('heart')} />
            <ToolbarItem dataTip="Carrinho" icon={carIcon} click={() => toolbarItemClickHanler('car')} />
            {props.auth?.token && (
                <ToolbarItem dataTip="Sair" icon={logoutIcon} click={onLogoutClickHandler} isLogout={true} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onResetProductsQuery: () => dispatch(actions.resetProductsQuery()),
        onSetFilters: (value) => dispatch(actions.setFilters(value)),
        onAuthCheck: () => dispatch(actions.authCheck()),
        onLogout: () => dispatch(actions.authLogout()),
        onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
