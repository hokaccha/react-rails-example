import superagent from 'superagent';

export const POST_COMMENT = 'POST_COMMENT';
export const UPDATE_SEARCH_WORD = 'UPDATE_SEARCH_WORD';

export function updateSearchWord(searchWord) {
  return {
    type: UPDATE_SEARCH_WORD,
    searchWord,
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
