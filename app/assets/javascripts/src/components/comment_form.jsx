import React from 'react';

export default class CommentForm extends React.Component {
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
