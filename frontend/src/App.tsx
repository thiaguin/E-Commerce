import React from 'react'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems'
import { withRouter, Route, Switch } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import Search from './components/Search/Search'
import './App.css'

const App = () => {
    return (
        <div>
            <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1 }}>
                <Toolbar />
                <NavigationItems />
            </div>
            <Switch>
                <Route
                    path="/wishes"
                    component={(props) => (
                        <div>
                            <h1>Wishes</h1>
                        </div>
                    )}
                />
                <Route
                    path="/shopping"
                    component={(props) => (
                        <div>
                            <h1>Shopping</h1>
                        </div>
                    )}
                />
                <Route
                    path="/login"
                    component={(props) => (
                        <div>
                            <h1>Login</h1>
                        </div>
                    )}
                />
                <Route
                    path="/contactus"
                    component={(props) => (
                        <div>
                            <h1>Contact us</h1>
                        </div>
                    )}
                />
                <Route path="/products" render={(props) => <Search {...props} />} />
                <Route path="/" render={(props) => <MainPage {...props} />} />
            </Switch>
        </div>
    )
}

export default withRouter(App)
