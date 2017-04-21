export const BOOK_LIST = "BOOK_LIST"
export const ADD_TODO = 'ADD_TODO'
export const TEST_DISPATCH = 'TEST_DISPATCH'
import * as Ajax from '../utils/ajax';


function updateBooks(items) {
  return { type: BOOK_LIST, items };
}

export const addTodo=(text)=> {
  return {
    type: 'ADD_TODO',
    text
  }
}

export const fetchBooks=(url)=> {
  return dispatch=>{
     let promise = Ajax.get(url);
     promise.then(function(result){
          dispatch(updateBooks(result))
     })
  }
}
