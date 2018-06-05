import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import { Provider } from 'react-redux';

import createStore from './store';

import Todo from './containers/Todo';


const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div className="container">
          <Todo />
        </div>
      </Provider>
    )
  }
};
