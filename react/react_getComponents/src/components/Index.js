import React from "react";
import {connect} from 'react-redux';
import {addTodo,fetchBooks} from '../actions'

import style from './index.less';

function TodoList(props) {
    const todos = props.list;
    const listItems = todos.map((item) => <li key={Math.random()}>{item.text}</li>);

    return (
        <ul className={style.todos}>{listItems}</ul>
    );
}

class Index extends React.Component {
    constructor(props) {
        super(props)
    }


    handleClick() {
        var val = this.refs.myTextInput.value;
        this.props.addTodo(val);
    }

    render() {
        return (
            <div className={style.content}>
                <h2 className={style.h2}>show Todos</h2>
                <div className="box">
                    <input type="text" className={style.textInput} ref="myTextInput"/><br/>
                    <button className={style.btn} onClick={this.handleClick.bind(this)}>add TODO</button>
                </div>
                <div>
                    <TodoList list={this.props.todoApp.todos}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      todoApp: state.todoApp,
      books:state.books
    }
}
export default connect(mapStateToProps, {addTodo,fetchBooks})(Index)
