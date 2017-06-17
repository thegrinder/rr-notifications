import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, notificationFactory, reduxNotificationsFactory } from './../src/index';

const Notification = props => (
  <div>
    <div>Notification</div>
    <button onClick={props.hideNotification}>Click to close</button>
  </div>
);

const TestNotification = notificationFactory(Notification);
const TestNotifications = reduxNotificationsFactory(TestNotification);

class Demo extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.showNotification}>Add notification</button>
        <TestNotifications/>
      </div>
    );
  }
}

export default connect(undefined, dispatch => bindActionCreators(actions, dispatch))(Demo);
