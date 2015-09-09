import React from 'react';
import reduxify from '../utils/reduxify';
import reducer from '../reducers/posts';
import PostList from '../components/post_list';
import PostListSearch from '../components/post_list_search';
import * as actions from '../actions';

class PostIndex extends React.Component {
  handleChange(searchWord) {
    let action = actions.updateSearchWord(searchWord);
    this.props.dispatch(action);
  }

  render() {
    return (
      <div className="postIndex">
        <PostListSearch onChange={this.handleChange.bind(this)} />
        <PostList posts={this.props.posts} searchWord={this.props.searchWord} />
      </div>
    );
  }
}

export default reduxify(PostIndex, reducer);
