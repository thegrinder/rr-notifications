import React, { Component } from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';

export default function containerFactory(WrappedContainer, WrappedNotification, options) {
  const defaultOptions = {
    position: ['40px', '40px', 'auto', 'auto'],
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
        <WrappedContainer position={mergedOptions.position}>
          {this.props.notifications.map((notification, index) => (
            <WrappedNotification
              key={notification.uid}
              uid={notification.uid}
              index={index}
            />
          ))}
        </WrappedContainer>
      );
    }
  }

  Container.propTypes = propTypes;

  return connect(({ notifications }) => ({ notifications }))(Container);
}
