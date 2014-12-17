var Post = React.createClass({
  getInitialState: function() {
    return {
      comments: this.props.initialComments
    };
  },

  handleSubmit: function(data) {
    $.ajax({
      method: 'POST',
      url: this.props.commentPostUrl,
      data: {
        'comment[name]': data.name,
        'comment[body]': data.body
      }
    }).done(this.handleCommentPostSuccess);
  },

  handleCommentPostSuccess: function(result) {
    this.setState({ comments: this.state.comments.concat(result) });
  },

  render: function() {
    var post = this.state.post;

    return (
      <div className="post">
        <div className="postHead">
          <h2 className="postHead-title">{this.props.post.title}</h2>
          <div className="postHead-meta">
            <span className="postHead-date">{Util.formatDateTime(this.props.post.created_at)}</span>
            <a href="#comments" className="postHead-comments">コメント({this.state.comments.length})</a>
          </div>
        </div>
        <div className="postBody" dangerouslySetInnerHTML={{__html: this.props.post.body}}/>
        <Comments comments={this.state.comments} />
        <CommentForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
});

var Comments = React.createClass({
  render: function() {
    var comments = this.props.comments.map(function(comment) {
      return <Comment key={comment.id} comment={comment} />;
    });

    return (
      <div className="comments" id="comments">
        <h2 className="comments-title">コメント</h2>
        <div className="comments-list">{comments}</div>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var c = this.props.comment;
    return (
      <div className="commentItem">
        <div className="commentItem-title">{c.name}</div>
        <div className="commentItem-date">{Util.formatDateTime(c.created_at)}</div>
        <div className="commentItem-body">{c.body}</div>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getDefaultProps: function() {
    return { onSubmit: function() {} };
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var name = this.refs.name.getDOMNode();
    var body = this.refs.body.getDOMNode();

    this.props.onSubmit({
      name: name.value.trim(),
      body: body.value.trim()
    });

    name.value = '';
    body.value = '';
  },
  render: function() {
    return (
      <div className="commentForm">
        <form onSubmit={this.handleSubmit}>
          <p><input className="commentForm-name" ref="name" type="text" placeholder="Your Name" /></p>
          <p><textarea className="commentForm-body" ref="body" placeholder="Your Comment"></textarea></p>
          <p><input className="btn" type="submit" /></p>
        </form>
      </div>
    );
  }
});
