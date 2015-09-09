import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import * as actions from '../actions';

export default function reduxify(ReactComponent, reducer) {
  let App = connect(state => state)(ReactComponent);

  return class ReduxComponent extends React.Component {
    constructor(props) {
      super(props);

      let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
      this.store = createStoreWithMiddleware(reducer, props);
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
