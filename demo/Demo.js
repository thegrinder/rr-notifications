import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, rrNotificationFactory, rrContainerFactory } from './../src/index';

const Notification = ({options: { type, text }, hideNotification }) => {
  return (
    <div>
      <div style={{ color: type === 'warning' ? 'red' : 'black' }}>{text}</div>
      <button onClick={hideNotification}>Click to close</button>
    </div>
  );
};

const DemoNotification = rrNotificationFactory(Notification, {
  animationDuration: '1s',
  animationEasing: 'ease',
  slideFromSide: 'left',
});

const DemoNotificationContainer = rrContainerFactory(DemoNotification, {
  position: ['auto', 'auto', '40px', '40px'],
  stackNextOn: 'top',
});

class Demo extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
  }
  handleShow() {
    this.props.showNotification({
      type: 'warning',
      text: 'This is a warning',
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleShow}>{'Add notification'}</button>
        <button onClick={this.props.hideAllNotifications}>{'Hide all'}</button>
        <DemoNotificationContainer/>
      </div>
    );
  }
}

export default connect(undefined, dispatch => bindActionCreators(actions, dispatch))(Demo);
