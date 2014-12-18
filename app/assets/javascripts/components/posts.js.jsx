var Posts = React.createClass({
  render: function() {
    return (
      <ul className="postList">{
        this.props.posts.map(function(post) {
          return <PostsItem key={post.id} post={post} />;
        })
      }</ul>
    );
  }
});

var PostsItem = React.createClass({
  render: function() {
    var url = "/posts/" + this.props.post.id;
    var date = Util.formatDate(this.props.post.created_at);

    return (
      <li className="postListItem">
        <span className="postListItem-date">{date}</span>
        <a href={url} className="postListItem-title">{this.props.post.title}</a>
      </li>
    );
  }
});
