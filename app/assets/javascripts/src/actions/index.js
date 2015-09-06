import superagent from 'superagent';

export const SET_INITIAL_POSTS = 'SET_INITIAL_POSTS';
export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';
export const POST_COMMENT = 'POST_COMMENT';

export function setInitialPosts(posts) {
  return {
    type: SET_INITIAL_POSTS,
    posts,
  };
}

export function setInitialData({ post, comments }) {
  return {
    type: SET_INITIAL_DATA,
    post,
    comments,
  };
}

export function postComment(comment) {
  return dispatch => {
    superagent
      .post(`${location.pathname}/comments`)
      .send({ comment })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
      .end((err, res) => {
        dispatch({
          type: POST_COMMENT,
          comment: {
            id: res.body.id,
            name: res.body.name,
            body: res.body.body,
          }
        });
      });
  };
}
