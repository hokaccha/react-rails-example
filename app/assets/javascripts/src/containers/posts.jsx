import React, { PropTypes } from 'react';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import * as reducers from '../reducers';
import * as actions from '../actions';
import thunk from 'redux-thunk';
import {formatDate} from '../common/util';

class PostsPage extends React.Component {
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

function mapStateToProps(state) {
  return { posts: state.posts };
}

let App = connect(mapStateToProps)(PostsPage);
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers.posts);

export default class Posts extends React.Component {
  componentWillMount() {
    store.dispatch(actions.setInitialPosts(this.props.posts));
  }

  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
