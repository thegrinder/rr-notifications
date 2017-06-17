import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reduxNotificationsFactory from 'factories/reduxNotificationsFactory';
import notificationFactory from 'factories/notificationFactory';
import * as notificationsActionCreators from 'redux/actions';

const Notification = props => (
  <div>
    <div>Next</div>
    <button onClick={props.hideNotification}>line two</button>
    <button onClick={props.hideNotification}>line two</button>
  </div>
);

const TestNotification = notificationFactory(Notification);
const TestNotifications = reduxNotificationsFactory(TestNotification);

class App extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.showNotification}>Add notification</button>
        <TestNotifications/>
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(notificationsActionCreators, dispatch),
)(App);
