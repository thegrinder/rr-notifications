import React, { Component } from 'react';
import { func, string, bool, oneOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification } from '../redux/actions';
import Notification from '../components/Notification';

export default function notificationFactory(WrappedNotification) {
  const propTypes = {
    hideNotification: func.isRequired,
    animatedMargin: string.isRequired,
    isVisible: bool.isRequired,
    animationDuration: string.isRequired,
    slideFromSide: oneOf(['left', 'right']),
    options: object,
  };

  class NotificationContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height: 0,
      };
      this.handleHidingNotification = this.handleHidingNotification.bind(this);
    }
    componentDidMount() {
      this.setState({
        height: this.notification.clientHeight,
      });
    }
    handleHidingNotification() {
      this.props.hideNotification(this.props.uid);
    }
    render() {
      return (
        <div ref={(notification) => { this.notification = notification; }}>
          <Notification
            animatedMargin={this.props.animatedMargin}
            notificationHeight={this.state.height}
            hideNotification={this.handleHidingNotification}
            isVisible={this.props.isVisible}
            animationDuration={this.props.animationDuration}
            animationEasing={this.props.animationEasing}
            slideFromSide={this.props.slideFromSide}
          >
            <WrappedNotification
              notificationHeight={this.state.height}
              hideNotification={this.handleHidingNotification}
              isVisible={this.props.isVisible}
              animationDuration={this.props.animationDuration}
              options={this.props.options}
            />
          </Notification>
        </div>
      );
    }
  }

  NotificationContainer.propTypes = propTypes;

  function mapStateToProps({ notifications }, props) {
    const { isVisible, options } = notifications.find(notification => notification.uid === props.uid);
    return {
      isVisible,
      options,
    };
  }

  return connect(
    mapStateToProps,
    dispatch => bindActionCreators({ hideNotification }, dispatch),
  )(NotificationContainer);
}
