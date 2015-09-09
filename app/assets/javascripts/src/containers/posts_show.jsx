import React, { PropTypes } from 'react';
import reduxify from '../utils/reduxify';
import PostHead from '../components/post_head';
import PostBody from '../components/post_body';
import Comments from '../components/comments';
import CommentForm from '../components/comment_form';
import reducer from '../reducers/post';
import * as actions from '../actions';

class PostShow extends React.Component {
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

export default reduxify(PostShow, reducer);
