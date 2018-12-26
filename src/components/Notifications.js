import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import NotificationContainer from './NotificationContainer';

export const NotificationsContext = createContext({});

const propTypes = {
  children: PropTypes.node.isRequired,
  renderNotification: PropTypes.func.isRequired,
  position: PropTypes.array,
  stackNextOn: PropTypes.string,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  dismissAfter: PropTypes.number,
  slideFromSide: PropTypes.string,
};

const defaultProps = {
  position: ['40px', '40px', 'auto', 'auto'],
  stackNextOn: 'top',
  animationDuration: 400,
  animationEasing: 'ease',
  dismissAfter: 10000,
  slideFromSide: '',
};

const Notifications = ({
  children,
  renderNotification,
  position,
  stackNextOn,
  animationDuration,
  animationEasing,
  slideFromSide,
  dismissAfter,
}) => {
  const [notifications, updateNotifications] = useState([]);
  const showNotification = (payload = {}) => updateNotifications(state => (
    state.concat({
      id: Date.now(),
      isVisible: true,
      payload,
    })
  ));
  const hideNotification = id => updateNotifications(state => (
    state.map(notification => (
      notification.id === id
        ? {
          ...notification,
          isVisible: false,
        }
        : notification
    ))
  ));
  const unmountNotification = id => updateNotifications(state => (
    state.filter(notification => notification.id !== id)
  ));
  const removeNotification = id => () => {
    hideNotification(id);
    setTimeout(() => unmountNotification(id), 10000);
  };

  return (
    <NotificationsContext.Provider value={{ showNotification, removeNotification }}>
      <Container
        position={position}
        stackNextOn={stackNextOn}
        animationDuration={animationDuration}
        animationEasing={animationEasing}
        slideFromSide={slideFromSide}
      >
        {notifications.map(({ id, payload, isVisible }) => (
          <NotificationContainer
            animatedMargin={position[0] === 'auto' ? 'bottom' : 'top'}
            key={id}
            id={id}
            animationDuration={animationDuration}
            animationEasing={animationEasing}
            slideFromSide={slideFromSide}
            dismissAfter={dismissAfter}
            isVisible={isVisible}
          >
            {renderNotification({
              removeNotification: removeNotification(id),
              payload,
            })}
          </NotificationContainer>
        ))}
      </Container>
      {children}
    </NotificationsContext.Provider>
  );
};

Notifications.propTypes = propTypes;
Notifications.defaultProps = defaultProps;

export default Notifications;
