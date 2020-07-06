import React, { useCallback, useEffect } from 'react'
import MainPage from './pages/MainPage/MainPage'
import Product from './pages/Product/Product'
import Search from './pages/Search/Search'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import Auth from './pages/Auth/Auth'
import Header from './components/Header/Header'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './store/actions/index'
import './App.css'
import { connect, useDispatch } from 'react-redux'
import Order from './pages/Order/Order'
import Erro from './components/Erro/Erro'
import Success from './components/Success/Success'
import Orders from './pages/Orders/Orders'
import OrderPage from './pages/Orders/OrderPage/OrderPage'
import Favorites from './pages/Favorites/Favorites'
import About from './pages/About/About'

const App = (props) => {
    const dispatch = useDispatch()
    const onAuthCheck = useCallback(() => dispatch(actions.authCheck()), [dispatch])

    useEffect(() => {
        onAuthCheck()
    }, [onAuthCheck])

    let routes = (
        <Switch>
            <Route path="/wishes" component={(props) => <Favorites {...props} />} />
            <Route path="/shopping" render={(props) => <ShoppingCart {...props} />} />
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/about" render={(props) => <About {...props} />} />
            <Route path="/products/show/:id" render={(props) => <Product {...props} />} />
            <Route path="/products" render={(props) => <Search {...props} />} />
            <Route path="/" render={(props) => <MainPage {...props} />} />
        </Switch>
    )

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/wishes" component={(props) => <Favorites {...props} />} />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/about" render={(props) => <About {...props} />} />
                <Route path="/orders/show/:id" render={(props) => <OrderPage {...props} />} />
                <Route path="/orders" render={(props) => <Orders {...props} />} />
                <Route path="/shopping/order/success" render={(props) => <Success {...props} />} />
                <Route path="/shopping/order/error" render={(props) => <Erro {...props} />} />
                <Route path="/shopping/order" render={(props) => <Order {...props} />} />
                <Route path="/shopping" render={(props) => <ShoppingCart {...props} />} />
                <Route path="/products/show/:id" render={(props) => <Product {...props} />} />
                <Route path="/products" render={(props) => <Search {...props} />} />
                <Route path="/" render={(props) => <MainPage {...props} />} />
            </Switch>
        )
    }

    return (
        <div>
            <Header />
            {routes}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: !!state.auth?.token,
    }
}

export default withRouter(connect(mapStateToProps)(App))
