import React from 'react';
import reduxify from '../utils/reduxify';
import reducer from '../reducers/posts';
import { formatDate } from '../utils/date';

class PostIndex extends React.Component {
  render() {
    let items = this.props.posts.map(post => {
      return <PostsItem key={post.id} post={post} />;
    });

    return <ul className="postList">{items}</ul>;
  }
}

class PostsItem extends React.Component {
  render() {
    let url = "/posts/" + this.props.post.id;
    let date = formatDate(this.props.post.created_at);

    return (
      <li className="postListItem">
        <span className="postListItem-date">{date}</span>
        <a href={url} className="postListItem-title">{this.props.post.title}</a>
      </li>
    );
  }
}

export default reduxify(PostIndex, reducer);
