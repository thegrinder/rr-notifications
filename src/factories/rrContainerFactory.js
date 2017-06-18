import React, { Component } from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';
import Container from '../components/Container';

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
    options,
  };

  const propTypes = {
    notifications: array.isRequired,
  };

  class Notifications extends Component {
    render() {
      return (
        <Container position={mergedOptions.position} stackNextOn={mergedOptions.stackNextOn}>
          {this.props.notifications.map(notification => (
            <WrappedNotification
              animatedMargin={mergedOptions.position[0] === 'auto' ? 'bottom' : 'top'}
              key={notification.uid}
              uid={notification.uid}
              animationDuration={mergedOptions.animationDuration}
              animationEasing={mergedOptions.animationEasing}
              slideFromSide={mergedOptions.slideFromSide}
            />
          ))}
        </Container>
      );
    }
  }

  Notifications.propTypes = propTypes;

  return connect(({ notifications }) => ({ notifications }))(Notifications);
}
