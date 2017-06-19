import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification } from '../redux/actions';
import Container from '../components/Container';
import NotificationContainer from '../components/NotificationContainer';

export default function rrContainerFactory(WrappedNotification, options = {}) {
  const defaultOptions = {
    position: ['40px', '40px', 'auto', 'auto'],
    stackNextOn: 'bottom',
    animationDuration: '.4s',
    animationEasing: 'ease',
    slideFromSide: 'right',
  };
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const propTypes = {
    notifications: array.isRequired,
    hideNotification: func.isRequired,
  };

  class Notifications extends Component {
    render() {
      return (
        <Container position={mergedOptions.position} stackNextOn={mergedOptions.stackNextOn}>
          {this.props.notifications.map(notification => (
            <NotificationContainer
              animatedMargin={mergedOptions.position[0] === 'auto' ? 'bottom' : 'top'}
              key={notification.uid}
              uid={notification.uid}
              animationDuration={mergedOptions.animationDuration}
              animationEasing={mergedOptions.animationEasing}
              slideFromSide={mergedOptions.slideFromSide}
            >
              <WrappedNotification
                notificationHeight={notification.height}
                hideNotification={() => { this.props.hideNotification(notification.uid); }}
                isVisible={notification.isVisible}
                options={notification.options}
                animationDuration={mergedOptions.animationDuration}
              />
            </NotificationContainer>
          ))}
        </Container>
      );
    }
  }

  Notifications.propTypes = propTypes;

  return connect(
    ({ notifications }) => ({ notifications }),
    dispatch => bindActionCreators({ hideNotification }, dispatch),
  )(Notifications);
}
