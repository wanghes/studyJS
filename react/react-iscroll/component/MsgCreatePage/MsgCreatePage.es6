import React from "react";
import {Link} from "react-router";

export default class MsgCreatePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div></div>
        );
    }
}

MsgCreatePage.contextTypes = {
    router: () => { React.PropTypes.object.isRequired }
};
