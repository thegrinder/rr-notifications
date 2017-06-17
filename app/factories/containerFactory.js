import React, { Component } from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';

export default function containerFactory(WrappedContainer, WrappedNotification, options = {}) {
  const defaultOptions = {
    position: ['auto', 'auto', '40px', '40px'],
    stackNextOn: 'top',
  };
  const mergedOptions = {
    ...defaultOptions,
    options,
  };

  const propTypes = {
    notifications: array.isRequired,
  };

  class Container extends Component {
    render() {
      return (
        <WrappedContainer
          position={mergedOptions.position}
          stackNextOn={mergedOptions.stackNextOn}
        >
          {this.props.notifications.map((notification, index) => (
            <WrappedNotification
              animatedMargin={mergedOptions.position[0] === 'auto' ? 'bottom' : 'top'}
              key={notification.uid}
              uid={notification.uid}
              index={index}
              stackNextOn={mergedOptions}
            />
          ))}
        </WrappedContainer>
      );
    }
  }

  Container.propTypes = propTypes;

  return connect(({ notifications }) => ({ notifications }))(Container);
}
