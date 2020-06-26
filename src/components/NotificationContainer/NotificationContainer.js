import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  convertToCssDuration,
  getAnimatedMargin,
  capitalize,
} from '../../helpers/utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationEasing: PropTypes.string.isRequired,
};

const NotificationContainer = ({
  children,
  position,
  isVisible,
  animationDuration,
  animationEasing,
}) => {
  const notificationRef = useRef(null);
  const [height, updateHeight] = useState(0);

  useLayoutEffect(() => {
    if (notificationRef.current) {
      updateHeight(notificationRef.current.clientHeight);
    }
  }, [notificationRef]);

  return (
    <div
      ref={notificationRef}
      style={{
        position: 'relative',
        zIndex: isVisible ? 999999 : -1,
        transitionProperty: `margin-${getAnimatedMargin(position)}, opacity`,
        transitionDuration: convertToCssDuration(animationDuration),
        transitionTimingFunction: animationEasing,
        [`margin${capitalize(getAnimatedMargin(position))}`]: isVisible
          ? 0
          : `${-height}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

NotificationContainer.propTypes = propTypes;

export default NotificationContainer;
