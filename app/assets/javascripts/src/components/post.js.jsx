import React from 'react';
import superagent from 'superagent';
import {formatDateTime} from '../common/util';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: this.props.initialComments };
  }

  handleSubmit(data) {
    superagent
      .post(this.props.commentPostUrl)
      .send({ comment: data })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
      .end((err, res) => {
        this.handleCommentPostSuccess(res.body);
      });
  }

  handleCommentPostSuccess(result) {
    this.setState({ comments: this.state.comments.concat(result) });
  }

  render() {
    let post = this.props.post;
    let comments = this.state.comments;

    return (
      <div className="post">
        <PostHead title={post.title} created_at={post.created_at} commentLength={comments.length} />
        <PostBody body={post.body} />
        <Comments comments={comments} />
        <CommentForm onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

class PostHead extends React.Component {
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

class PostBody extends React.Component {
  render() {
    return (
      <div className="postBody" dangerouslySetInnerHTML={{__html: this.props.body}}/>
    );
  }
}

class Comments extends React.Component {
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

class CommentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    let name = React.findDOMNode(this.refs.name);
    let body = React.findDOMNode(this.refs.body);

    this.props.onSubmit({
      name: name.value.trim(),
      body: body.value.trim()
    });

    name.value = '';
    body.value = '';
  }

  render() {
    return (
      <div className="commentForm">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <p><input className="commentForm-name" ref="name" type="text" placeholder="Your Name" /></p>
          <p><textarea className="commentForm-body" ref="body" placeholder="Your Comment"></textarea></p>
          <p><input className="btn" type="submit" /></p>
        </form>
      </div>
    );
  }
}
