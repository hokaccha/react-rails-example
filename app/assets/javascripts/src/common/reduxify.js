import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

export default function reduxify(ReactComponent, reducer) {
  let App = connect(state => state)(ReactComponent);

  return class ReduxComponent extends React.Component {
    constructor(props) {
      super(props);

      let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
      this.store = createStoreWithMiddleware(reducer, this.props);
    }

    render() {
      return (
        <Provider store={this.store}>
          {() => <App />}
        </Provider>
      );
    }
  }
}
