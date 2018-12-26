import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { NotificationsProvider } from '../src/index';
import reducer from '../src/redux/reducer';
import Demo from './Demo';

const store = createStore(combineReducers({ notifications: reducer }));

// Your custom notification component
const renderNotification = ({ options, hideNotification }) => {
  const { type, text } = options;
  return (
    <div>
      <div style={{ color: type === 'warning' ? 'red' : 'black' }}>{text}</div>
      <button type="button" onClick={hideNotification}>Click to close</button>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <NotificationsProvider renderNotification={renderNotification}>
      <Demo />
    </NotificationsProvider>
  </Provider>,
  document.getElementById('app'),
);
