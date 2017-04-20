import * as actions from '../actions/index'
export const testData = (state = {}, action = {}) => {
    switch(action.type){
        case actions.TEST_DISPATCH:
            return Object.assign({},state,action);
        default:
            return state;
    }
}
