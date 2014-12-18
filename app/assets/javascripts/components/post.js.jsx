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
    var post = this.props.post;
    var comments = this.state.comments;

    return (
      <div className="post">
        <PostHead title={post.title} created_at={post.created_at} commentLength={comments.length} />
        <PostBody body={post.body} />
        <Comments comments={comments} />
        <CommentForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
});

var PostHead = React.createClass({
  render: function() {
    return (
      <div className="postHead">
        <h2 className="postHead-title">{this.props.title}</h2>
        <div className="postHead-meta">
          <span className="postHead-date">{Util.formatDateTime(this.props.created_at)}</span>
          <a href="#comments" className="postHead-comments">コメント({this.props.commentLength})</a>
        </div>
      </div>
    );
  }
});

var PostBody = React.createClass({
  render: function() {
    return (
      <div className="postBody" dangerouslySetInnerHTML={{__html: this.props.body}}/>
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
