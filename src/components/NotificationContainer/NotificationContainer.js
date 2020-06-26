import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Notification from '../Notification/Notification';

const propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationEasing: PropTypes.string.isRequired,
  slideFromSide: PropTypes.string.isRequired,
};

const NotificationContainer = ({
  children,
  position,
  isVisible,
  animationDuration,
  animationEasing,
  slideFromSide,
}) => {
  const notificationRef = useRef(null);
  const [height, updateHeight] = useState(0);

  useLayoutEffect(() => {
    if (notificationRef.current) {
      updateHeight(notificationRef.current.clientHeight);
    }
  }, [notificationRef]);

  return (
    <Notification
      ref={notificationRef}
      position={position}
      notificationHeight={height}
      isVisible={isVisible}
      slideFromSide={slideFromSide}
      animationEasing={animationEasing}
      animationDuration={animationDuration}
    >
      {children}
    </Notification>
  );
};

NotificationContainer.propTypes = propTypes;

export default NotificationContainer;
