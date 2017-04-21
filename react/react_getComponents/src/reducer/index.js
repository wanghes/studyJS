import * as actions from '../actions/index'
const initialTodoState = {
  todos:[]
};
const initialBookState = {
  list:[]
};
export const testData = (state = {}, action = {}) => {
    switch(action.type){
        case actions.TEST_DISPATCH:
            return Object.assign({},state,action);
        default:
            return state;
    }
}

export const todoApp = (state = initialTodoState, action={})=>{
  switch (action.type) {
    case actions.ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}

export const books = (state =initialBookState, action={})=>{
  switch (action.type) {
    case actions.BOOK_LIST:
      return {list:action.items};
    default:
      return state
  }
}
