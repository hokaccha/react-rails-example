import * as actions from '../actions';
import { combineReducers } from 'redux';

function post(state = { title: '', body: '' }, action) {
  // do nothig
  return state;
}

function comments(state = [], action) {
  switch (action.type) {
    case actions.POST_COMMENT:
      return state.concat(action.comment);
    default:
      return state;
  }
}

export default combineReducers({
  post,
  comments,
});
