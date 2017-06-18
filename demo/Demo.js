import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, notificationFactory, reduxNotificationsFactory } from './../src/index';

const Notification = ({options: { type, text }, hideNotification }) => {
  return (
    <div>
      <div style={{ color: type === 'warning' ? 'red' : 'black' }}>{text}</div>
      <button onClick={hideNotification}>Click to close</button>
    </div>
  );
};

const TestNotification = notificationFactory(Notification);
const TestNotifications = reduxNotificationsFactory(TestNotification);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.showNotification({
      type: 'warning',
      text: 'This is a warning',
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Add notification
        </button>
        <TestNotifications/>
      </div>
    );
  }
}

export default connect(undefined, dispatch => bindActionCreators(actions, dispatch))(Demo);
