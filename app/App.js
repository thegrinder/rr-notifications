import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import containerFactory from 'factories/containerFactory';
import notificationFactory from 'factories/notificationFactory';
import Container from 'components/Container';
import StyledNotification from 'components/Notification';
import * as notificationsActionCreators from 'redux/actions';

const Notification = props => (
  <StyledNotification
    notificationHeight={props.notificationHeight}
    isVisible={props.isVisible}
    animatedMargin={props.animatedMargin}
  >
    <div>Next</div>
    <button onClick={props.hideNotification}>line two</button>
    <button onClick={props.hideNotification}>line two</button>
  </StyledNotification>
);

const TestNotification = notificationFactory(Notification);
const TestNotifications = containerFactory(Container, TestNotification);

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
