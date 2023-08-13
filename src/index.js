import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from './utils/scrollTop';
import reducers from './reducers'

import App from './App'

import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <HelmetProvider>
            <BrowserRouter>
                <ScrollTop />
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </Provider>
)