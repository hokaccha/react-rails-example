import * as actions from '../actions';

let initialState = {
  post: { title: '', body: '' },
  comments: [],
};

export function post(state = initialState, action) {
  switch (action.type) {
    case actions.SET_INITIAL_DATA:
      return { post: action.post, comments: action.comments };
    case actions.POST_COMMENT:
      return {
        post: state.post,
        comments: state.comments.concat(action.comment),
      };
    default:
      return state;
  }
}

let initialStatePosts = {
  posts: []
};

export function posts(state = initialStatePosts, action) {
  switch (action.type) {
    case actions.SET_INITIAL_POSTS:
      return { posts: action.posts };
    default:
      return state;
  }
}
