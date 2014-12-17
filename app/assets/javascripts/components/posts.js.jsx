var Posts = React.createClass({
  render: function() {
    var item = this.props.posts.map(function(post) {
      return <PostsItem key={post.id} post={post} />;
    });

    return (
      <ul className="postList">{item}</ul>
    );
  }
});

var PostsItem = React.createClass({
  render: function() {
    var url = "/posts/" + this.props.post.id;

    return (
      <li className="postListItem">
        <span className="postListItem-date">{Util.formatDate(this.props.post.created_at)}</span>
        <a href={url} className="postListItem-title">{this.props.post.title}</a>
      </li>
    );
  }
});
