import React from 'react';

export default class PostBody extends React.Component {
  render() {
    return (
      <div className="postBody" dangerouslySetInnerHTML={{__html: this.props.body}}/>
    );
  }
}
