import { createStore } from 'redux';
import React from 'react';
import { render } from 'react-dom'
var _ = require('lodash');

import reducer from './reducers'
import App from './components/App'
import { Provider } from 'react-redux'


const store = createStore(reducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
