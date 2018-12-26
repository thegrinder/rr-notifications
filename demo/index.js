import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../src/redux/reducer';
import Demo from './Demo';

const store = createStore(combineReducers({ notifications: reducer }));

ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  document.getElementById('app'),
);
