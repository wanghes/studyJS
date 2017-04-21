import React from "react";
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import MainRoute from './main';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {AppContainer} from 'react-hot-loader';
import * as reducer from './reducer/index';

var store = createStore(combineReducers(reducer), applyMiddleware(thunk));

ReactDOM.render(
    <AppContainer>
    <Provider store={store}>
        <MainRoute/>
    </Provider>
</AppContainer>, document.querySelector('#root'))

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./main.jsx', () => {
        ReactDOM.render(
            <AppContainer>
            <Provider store={store}>
                <MainRoute/>
            </Provider>
        </AppContainer>, document.querySelector('#root'))
    });
}
