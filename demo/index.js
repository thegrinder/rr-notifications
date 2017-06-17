import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../src/redux/reducer';
import Demo from './Demo';

const store = createStore(combineReducers({ notifications: reducer }));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(Demo);

if (module.hot) {
  module.hot.accept('./Demo', () => {
    render(Demo);
  });
}
