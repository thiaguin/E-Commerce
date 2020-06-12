import React from 'react'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import NavigationItems from './components/Navigation/NavigationItems/NavigationItems'
import { withRouter, Route, Switch } from 'react-router-dom'
import mainImg from './assets/background.png'
import './App.css'

const App = () => {
    return (
        <div className="App">
            <Toolbar />
            <NavigationItems />
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
                <Route
                    path="/"
                    component={(props) => (
                        <div>
                            <img src={mainImg} alt="img" />
                            <img src={mainImg} alt="img" />
                        </div>
                    )}
                />
            </Switch>
            <div>Hello world!</div>
        </div>
    )
}

export default withRouter(App)
