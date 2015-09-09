import React from 'react';
import { formatDate } from '../utils/date';

export default class PostList extends React.Component {
  render() {
    let items = this.props.posts.map(post => {
      return <Item key={post.id} post={post} searchWord={this.props.searchWord} />;
    });

    return <ul className="postList">{items}</ul>;
  }
}

class Item extends React.Component {
  render() {
    let url = "/posts/" + this.props.post.id;
    let date = formatDate(this.props.post.created_at);
    let searchWord = this.props.searchWord;
    let shown = !searchWord || this.props.post.title.match(searchWord);

    return (
      <li className="postListItem" hidden={!shown}>
        <span className="postListItem-date">{date}</span>
        <a href={url} className="postListItem-title">{this.props.post.title}</a>
      </li>
    );
  }
}
