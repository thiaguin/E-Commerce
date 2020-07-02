import React, { useCallback, useEffect } from 'react'
import MainPage from './components/MainPage/MainPage'
import Product from './components/Product/Product'
import Search from './components/Search/Search'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import Auth from './components/Auth/Auth'
import Header from './components/Header/Header'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './store/actions/index'
import './App.css'
import { connect, useDispatch } from 'react-redux'
import Order from './components/Order/Order'

const App = (props) => {
    const dispatch = useDispatch()
    const onAuthCheck = useCallback(() => dispatch(actions.authCheck()), [dispatch])

    useEffect(() => {
        onAuthCheck()
    }, [onAuthCheck])

    let routes = (
        <Switch>
            <Route
                path="/wishes"
                component={(props) => (
                    <div>
                        <h1>Wishes</h1>
                    </div>
                )}
            />
            <Route path="/shopping" render={(props) => <ShoppingCart {...props} />} />
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route
                path="/contactus"
                component={(props) => (
                    <div>
                        <h1>Contact us</h1>
                    </div>
                )}
            />
            <Route path="/products/show/:id" render={(props) => <Product {...props} />} />
            <Route path="/products" render={(props) => <Search {...props} />} />
            <Route path="/" render={(props) => <MainPage {...props} />} />
        </Switch>
    )

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route
                    path="/wishes"
                    component={(props) => (
                        <div>
                            <h1>Wishes</h1>
                        </div>
                    )}
                />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route
                    path="/contactus"
                    component={(props) => (
                        <div>
                            <h1>Contact us</h1>
                        </div>
                    )}
                />
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
