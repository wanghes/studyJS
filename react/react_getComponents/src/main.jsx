import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, IndexRoute } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import List from './components/List';
import index from './components/Index';
import About from './components/About';
import Topics from './components/Topics';
const styles = {}

styles.fill = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}


const MainRoute = () => (
    <Router>
        <Route render={({ location }) => {
            let cm = index;
            switch (location.pathname) {
                case "/index":
                    cm = index;
                    break;
                case "/about":
                    cm = About;
                    break;
                case "/topics":
                    cm = Topics;
                    break;
                case "/list":
                    cm = List;
                    break;
            }

            return (
                <div style={styles.fill}>
                    <Route path="/index" component={index} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} />
                    <Route path="/list" component={List} />
                    <ul id="header">
                        <li>
                            <Link to="/index">Index</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                        <li>
                            <Link to="/list">List</Link>
                        </li>
                    </ul>

                    <div style={styles.content}>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            <Route  location={location} key={location.key} component={cm} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            )
        }} />
    </Router>
);

export default MainRoute;
