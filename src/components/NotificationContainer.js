import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';


const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  hideNotification: PropTypes.func.isRequired,
  unmountNotification: PropTypes.func.isRequired,
  animatedMargin: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationEasing: PropTypes.string.isRequired,
  dismissAfter: PropTypes.number.isRequired,
  slideFromSide: PropTypes.string.isRequired,
};

const NotificationContainer = ({
  children,
  id,
  hideNotification,
  unmountNotification,
  animatedMargin,
  isVisible,
  animationDuration,
  animationEasing,
  dismissAfter,
  slideFromSide,
}) => {
  const notificationRef = useRef(null);
  const [height, updateHeight] = useState(0);

  useLayoutEffect(() => {
    if (notificationRef.current) {
      updateHeight(notificationRef.current.clientHeight);
    }
  }, [notificationRef]);

  useEffect(() => {
    setTimeout(() => {
      hideNotification(id);
    }, dismissAfter);
    setTimeout(() => {
      unmountNotification(id);
    }, dismissAfter + animationDuration);
  }, isVisible);

  return (
    <Notification
      ref={notificationRef}
      animatedMargin={animatedMargin}
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
