import React from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, rrNotificationsFactory } from './../src/index';


// Your custom notification component
const Notification = ({ options, hideNotification }) => {
  const { type, text } = options;
  return (
    <div>
      <div style={{ color: type === 'warning' ? 'red' : 'black' }}>{text}</div>
      <button onClick={hideNotification}>Click to close</button>
    </div>
  );
};

Notification.propTypes = {
  hideNotification: func.isRequired,
  options: object,
};

// Higher Order Component provided by 'rr-notifications'
const DemoNotificationContainer = rrNotificationsFactory(Notification);

// Demo component that fires notification or hides them all
const Demo = ({ showNotification, hideAllNotifications }) => (
  <div>
    <button onClick={() => showNotification({
      type: 'warning',
      text: 'This is a warning',
    })}>
      {'Add notification'}
    </button>
    <button onClick={() => hideAllNotifications()}>
      {'Hide all notifications'}
    </button>
    <DemoNotificationContainer />
  </div>
);

Demo.propTypes = {
  showNotification: func.isRequired,
  hideAllNotifications: func.isRequired,
};

export default connect(
  undefined,
  dispatch => bindActionCreators(actions, dispatch),
)(Demo);
