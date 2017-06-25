import React, { Component } from 'react';
import { func, string, bool, object,
  number, oneOf, any } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNotificationHeight, hideNotification } from '../redux/actions';
import Notification from '../components/Notification';


const propTypes = {
  uid: any.isRequired,
  setNotificationHeight: func.isRequired,
  hideNotification: func.isRequired,
  animatedMargin: string.isRequired,
  isVisible: bool.isRequired,
  animationDuration: number.isRequired,
  animationEasing: string.isRequired,
  height: number.isRequired,
  dismissAfter: number.isRequired,
  slideFromSide: oneOf(['left', 'right']),
  options: object,
};

export class NotificationContainer extends Component {
  componentDidMount() {
    this.props.setNotificationHeight(this.props.uid, this.notification.clientHeight);
    setTimeout(() => {
      this.props.hideNotification(this.props.uid);
    }, this.props.dismissAfter);
  }
  render() {
    return (
      <div ref={(notification) => { this.notification = notification; }}>
        <Notification
          animatedMargin={this.props.animatedMargin}
          notificationHeight={this.props.height}
          isVisible={this.props.isVisible}
          slideFromSide={this.props.slideFromSide}
          animationEasing={this.props.animationEasing}
          animationDuration={this.props.animationDuration}
        >
          {this.props.children}
        </Notification>
      </div>
    );
  }
}

NotificationContainer.propTypes = propTypes;

function mapStateToProps({ notifications }, props) {
  const { isVisible, options, height } = notifications.find(notification => (
    notification.uid === props.uid
  ));
  return {
    isVisible,
    options,
    height,
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    setNotificationHeight,
    hideNotification,
  }, dispatch),
)(NotificationContainer);
