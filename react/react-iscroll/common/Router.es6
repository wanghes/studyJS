import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

// 默认的App根路由，作为组件容器
import Container from "../component/Container";

// 各种小组件在这里引入
import MsgListPage from "../component/MsgListPage/MsgListPage";
import MsgDetailPage from "../component/MsgDetailPage/MsgDetailPage";
import MsgCreatePage from "../component/MsgCreatePage/MsgCreatePage";

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={Container}>
                <IndexRoute component={MsgListPage} />
                <Route path="msg-list-page" component={MsgListPage}/>
                <Route path="msg-detail-page/:msgId" component={MsgDetailPage}/>
                <Route path="msg-create-page" component={MsgCreatePage}/>
            </Route>
        </Router>
    ),
    document.getElementById('reactRoot')
);