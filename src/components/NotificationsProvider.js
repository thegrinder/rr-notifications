import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import NotificationContainer from './NotificationContainer';

export const NotificationsContext = createContext({});

const propTypes = {
  children: PropTypes.node.isRequired,
  renderNotification: PropTypes.func.isRequired,
  position: PropTypes.array,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  dismissAfter: PropTypes.number,
  slideFromSide: PropTypes.string,
};

const defaultProps = {
  position: ['40px', '40px', 'auto', 'auto'],
  animationDuration: 400,
  animationEasing: 'ease',
  dismissAfter: 10000,
  slideFromSide: '',
};

const NotificationsProvider = ({
  children,
  renderNotification,
  position,
  animationDuration,
  animationEasing,
  slideFromSide,
  dismissAfter,
}) => {
  const [notifications, updateNotifications] = useState([]);
  const showNotification = (payload = {}) => updateNotifications(state => (
    state.concat({
      id: Date.now().toString(),
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
      <Container position={position}>
        {notifications.map(({ id, payload, isVisible }) => (
          <NotificationContainer
            key={id}
            id={id}
            position={position}
            hideNotification={hideNotification}
            unmountNotification={unmountNotification}
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

NotificationsProvider.propTypes = propTypes;
NotificationsProvider.defaultProps = defaultProps;

export default NotificationsProvider;
