import React from 'react'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems'
import { withRouter, Route, Switch } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import './App.css'

const App = () => {
    return (
        <div className="App">
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
                    path="/search"
                    component={(props) => (
                        <div>
                            <h1>Search</h1>
                        </div>
                    )}
                />
                <Route path="/" render={(props) => <MainPage {...props} />} />
            </Switch>
            <div>Hello world!</div>
        </div>
    )
}

export default withRouter(App)