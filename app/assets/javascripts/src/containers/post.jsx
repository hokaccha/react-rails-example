import React, { PropTypes } from 'react';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import PostHead from '../components/post_head';
import PostBody from '../components/post_body';
import Comments from '../components/comments';
import CommentForm from '../components/comment_form';
import * as reducers from '../reducers';
import * as actions from '../actions';
import thunk from 'redux-thunk';

class PostPage extends React.Component {
  render() {
    let { post, comments, dispatch } = this.props;

    return (
      <div className="post">
        <PostHead title={post.title} created_at={post.created_at} commentLength={comments.length} />
        <PostBody body={post.body} />
        <Comments comments={comments} />
        <CommentForm onSubmit={(comment) => dispatch(actions.postComment(comment))} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
    comments: state.comments,
  };
}

let App = connect(mapStateToProps)(PostPage);
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers.post);

export default class Post extends React.Component {
  componentWillMount() {
    store.dispatch(actions.setInitialData(this.props));
  }

  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
