import React from "react";
import {connect} from "react-redux";
import style from './topic';
import {fetchBooks} from '../actions';

const BookList = (props) => {
    let list = props.list;
    const listItems = list.map((item) => {
        return (
            <li key={Math.random()}>
                <strong>{item.author}</strong>&nbsp;|&nbsp;
                <span>{item.name}</span>&nbsp;|&nbsp;
                <span>{item.publish}</span>
            </li>
        )
    });
    return (
        <ul className={style.todos}>{listItems}</ul>
    );
}

class Topics extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.fetchBooks('http://localhost:3001/books');
    }
    render() {
        return (
            <div className={style.content}>
                <h2>Topics page</h2>
                <div>
                    <BookList list={this.props.books.list}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {books: state.books}
}

export default connect(mapStateToProps, {fetchBooks})(Topics);
