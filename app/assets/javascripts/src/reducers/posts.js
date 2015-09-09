import * as actions from '../actions';
import { combineReducers } from 'redux';

function posts(state = [], action) {
  // do nothig
  return state;
}

function searchWord(state = '', action) {
  switch (action.type) {
    case actions.UPDATE_SEARCH_WORD:
      return action.searchWord;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  searchWord,
});
