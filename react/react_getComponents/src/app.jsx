import React from "react";
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Link, Redirect, IndexRoute } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Provider, connect } from 'react-redux';
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
    textAlign: 'center',
    background: "red"
}

styles.contentIndex = {
    ...styles.fill,
    textAlign: 'center',
    background: "green"
}

styles.content2 = {
    ...styles.fill,
    textAlign: 'center',
    background: "blue"
}

const index = () => {
    return (
        <div style={styles.contentIndex}>
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
        <div>
            <div>container</div>
        </div>
    )
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
                case "/index":
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
                            <Link to="/index"  >Index</Link>
                        </li>
                        <li>
                            <Link to="/about" >About</Link>
                        </li>
                        <li>
                            <Link to="/topics" >Topics</Link>
                        </li>
                        <li>
                            <Link to="/list" >List</Link>
                        </li>
                    </ul>

                    <div style={styles.content}>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {/* no different than other usage of
                        ReactCSSTransitionGroup, just make
                        sure to pass `location` to `Route`
                        so it can match the old location
                        as it animates out
                    */}

                            <Route  location={location} key={location.key} component={cm} />
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            )
        }} />
    </Router>
);

var store = createStore(combineReducers(reducer), applyMiddleware(thunk));




const AnimationExample = () => (
    <Router>
        <Route render={({ location }) => (
            <div style={styles.fill}>
                <Route exact path="/" render={() => (
                    <Redirect to="/10/90/50" />
                )} />

                <ul style={styles.nav}>
                    <NavLink to="/10/90/50">Red</NavLink>
                    <NavLink to="/120/100/40">Green</NavLink>
                    <NavLink to="/200/100/40">Blue</NavLink>
                    <NavLink to="/310/100/50">Pink</NavLink>
                </ul>

                <div style={styles.content}>
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >

                        <Route
                            location={location}
                            key={location.key}
                            path="/:h/:s/:l"
                            component={HSL}
                        />
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )} />
    </Router>
)

const NavLink = (props) => (
    <li style={styles.navItem}>
        <Link {...props} style={{ color: 'inherit' }} />
    </li>
)

const HSL = ({ match: { params } }) => (
    <div style={{
        ...styles.fill,
        ...styles.hsl,
        background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
    }}>hsl({params.h}, {params.s}%, {params.l}%)</div>
)

{/*
const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl  = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

*/}
ReactDOM.render(
    <Provider store={store}>
        <MainRoute />
    </Provider>, document.querySelector('#root'))
