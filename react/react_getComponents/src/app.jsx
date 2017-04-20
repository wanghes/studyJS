import React from "react";
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {HashRouter as Router, Route, Link, Redirect, IndexRoute} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import * as reducer from './reducer/index';
import List from './components/list';

const styles = {}

styles.fill = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}

styles.content_base = {
    ...styles.fill,
    top: '0'
}

styles.content = {
    ...styles.fill,
    top: '40px',
    textAlign: 'center',
    background: "#ff5"
}

styles.content1 = {
    ...styles.fill,
    top: '40px',
    textAlign: 'center',
    background: "red"
}

styles.content2 = {
    ...styles.fill,
    top: '40px',
    textAlign: 'center',
    background: "blue"
}

const index = () => {
    return (
        <div style={styles.content}>
            <h2>index</h2>
        </div>
    )
}

const About = () => (
    <div style={styles.content1}>
        <h1>About page</h1>
    </div>
)

const Topics = () => (
    <div style={styles.content2}>
        <h1>Topics page</h1>
    </div>
)

const container = (props) => {
    return (
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <div key={props.location.pathname}>
                <ul id="header">
                    <li>
                        <Link to="/index" replace>Index</Link>
                    </li>
                    <li>
                        <Link to="/about" replace>About</Link>
                    </li>
                    <li>
                        <Link to="/topics" replace>Topics</Link>
                    </li>
                    <li>
                        <Link to="/list" replace>List</Link>
                    </li>
                </ul>
                <div>{props.children}</div>
            </div>
        </ReactCSSTransitionGroup>
    )
}


const MainRoute = (
    <Router>

        <div style={styles.fill}>
            <Route path="/" component={container}>
                <Route path="/index" component={index}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/list" component={List}/>
            </Route>
            <Redirect from='*' to='/'/>

        </div>

    </Router>
);

var store = createStore(combineReducers(reducer), applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
    {MainRoute}
</Provider>, document.querySelector('#root'))
