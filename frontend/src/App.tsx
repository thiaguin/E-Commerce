import React from 'react'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import { withRouter, Route, Switch } from 'react-router-dom'
import './App.css'

const App = () => {
    return (
        <div className="App">
            <Toolbar />
            <Switch>
                <Route path="/wishes" component={(props) => <h1>Wishes</h1>} />
                <Route path="/shopping" component={(props) => <h1>Shopping</h1>} />
                <Route path="/login" component={(props) => <h1>Login</h1>} />
                <Route path="/search" component={(props) => <h1>Search</h1>} />
                <Route path="/" component={(props) => <h1>Main</h1>} />
            </Switch>
            <div>Hello world!</div>
        </div>
    )
}

export default withRouter(App)
