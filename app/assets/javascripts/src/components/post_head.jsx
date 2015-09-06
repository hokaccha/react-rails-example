import React from 'react';
import {formatDateTime} from '../common/util';

export default class PostHead extends React.Component {
  render() {
    return (
      <div className="postHead">
        <h2 className="postHead-title">{this.props.title}</h2>
        <div className="postHead-meta">
          <span className="postHead-date">{formatDateTime(this.props.created_at)}</span>
          <a href="#comments" className="postHead-comments">コメント({this.props.commentLength})</a>
        </div>
      </div>
    );
  }
}
