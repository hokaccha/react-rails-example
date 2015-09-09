import React from 'react';

export default class PostListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="search">
        <input type="search" value={this.state.value} placeholder="Search" onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}
