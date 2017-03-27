import React from "react";
import {Link} from "react-router";
import $ from "jquery";
import style from "./MsgDetailPage.css";
import ToolBar from "./ToolBar/ToolBar";

export default class MsgDetailPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            msgId: this.props.params.msgId,
            contentHeight: 0,
        };
    }

    componentDidMount() {
        let msgId = this.state.msgId;
        $.ajax({
            type: 'GET',
            url: '/msg-detail',
            data: {'msgId': msgId},
            dataType: 'json',
            success: (response) => {
                this.setState({
                    msgTitle: response.data.title,
                    msgContent: response.data.content
                });
                console.log(`msg-detail?msgId=${msgId} 请求成功, msgContent=${this.state.msgContent}`);
            },
            error: () => {
                console.log(`msg-detail?msgId=${msgId} 请求异常`);
            }
        });
    }

    componentDidUpdate() {
        let title = $(this.refs.MsgTitle);
        let container = $(this.refs.MsgContainer)
        let ToolBar = $(this.refs.ToolBar.refs.ToolBarContainter);

        // 上半部分总高度
        let height = title.height() + parseInt(title.css('padding-top')) +
            parseInt(title.css('padding-bottom')) +
            parseInt(container.css("padding-top")) +
            parseInt(container.css("padding-bottom")) +
            parseInt(ToolBar.height());

        // 窗口高度-上半部分总高度作为文章的最小高度
        if (this.state.contentHeight != window.innerHeight - height) { // 如果一样则不要setState避免递归渲染
            this.setState({
                contentHeight: window.innerHeight - height,
            });
        }
    }

    render() {
        // refs属性会捕获对应的原生的Dom节点，会在componentDidUpdate中访问Dom来动态计算高度
        return (
            <div>
                <ToolBar ref="ToolBar"/>
                <h1 id={style.MsgTitle} ref="MsgTitle">{this.state.msgTitle}</h1>
                <div id={style.MsgContainer} ref="MsgContainer" style={{minHeight: this.state.contentHeight}}>
                    <p id={style.MsgContent}>{this.state.msgContent}</p>
                </div>
            </div>
        );
    }
}

MsgDetailPage.contextTypes = {
    router: () => { React.PropTypes.object.isRequired }
};
