import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import navigationReducer from './store/reducers/navigation'
import suggestionsReducer from './store/reducers/suggestions'
import productsReducer from './store/reducers/products'
import productReducer from './store/reducers/product'
import authReducer from './store/reducers/auth'
import orderReducer from './store/reducers/order'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    navigation: navigationReducer,
    suggestions: suggestionsReducer,
    products: productsReducer,
    product: productReducer,
    auth: authReducer,
    order: orderReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
