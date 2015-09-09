import React from 'react';
import { formatDateTime } from '../utils/date';

export default class Comments extends React.Component {
  render() {
    let comments = this.props.comments.map(function(comment) {
      return <Comment key={comment.id} comment={comment} />;
    });

    return (
      <div className="comments" id="comments">
        <h2 className="comments-title">コメント</h2>
        <div className="comments-list">{comments}</div>
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    let c = this.props.comment;
    return (
      <div className="commentItem">
        <div className="commentItem-title">{c.name}</div>
        <div className="commentItem-date">{formatDateTime(c.created_at)}</div>
        <div className="commentItem-body">{c.body}</div>
      </div>
    );
  }
}
