import React, { Component } from 'react';
import { func, string, bool, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification } from '../redux/actions';
import Notification from '../components/Notification';

export default function notificationFactory(WrappedNotification, notificationOptions = {}) {
  const defaultOptions = {
    animationDuration: '.4s',
    animationEasing: 'ease',
    slideFromSide: 'right',
  };
  const mergedOptions = {
    ...defaultOptions,
    ...notificationOptions,
  };

  const propTypes = {
    hideNotification: func.isRequired,
    animatedMargin: string.isRequired,
    isVisible: bool.isRequired,
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
            slideFromSide={mergedOptions.slideFromSide}
            animationEasing={mergedOptions.animationEasing}
            animationDuration={mergedOptions.animationDuration}
          >
            <WrappedNotification
              notificationHeight={this.state.height}
              hideNotification={this.handleHidingNotification}
              isVisible={this.props.isVisible}
              options={this.props.options}
              animationDuration={mergedOptions.animationDuration}
            />
          </Notification>
        </div>
      );
    }
  }

  NotificationContainer.propTypes = propTypes;

  function mapStateToProps({ notifications }, props) {
    const { isVisible, options } = notifications.find(notification => (
      notification.uid === props.uid
    ));
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
