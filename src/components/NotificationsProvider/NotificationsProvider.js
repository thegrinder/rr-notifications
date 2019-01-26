import React, { createContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container';
import NotificationContainer from '../NotificationContainer/NotificationContainer';

export const NotificationsContext = createContext({});

const propTypes = {
  /** Children */
  children: PropTypes.node.isRequired,
  /** Render prop which passes down removeNotification function and notification payload */
  renderNotification: PropTypes.func.isRequired,
  /** Fixed position where all notifications are displayed */
  position: PropTypes.array,
  /** Duration of the show and hide animations in miliseconds */
  animationDuration: PropTypes.number,
  /** Animation timing function / cubic-bezier */
  animationEasing: PropTypes.string,
  /** Time in miliseconds after which the notification is automatically dismissed */
  dismissAfter: PropTypes.number,
  /**
   * Horizontal direction which notification appears from. If not provided,
   * the notification will appear from top or bottom, depending on position prop
   * */
  slideFromSide: PropTypes.string,
};

const defaultProps = {
  position: ['40px', '40px', 'auto', 'auto'],
  animationDuration: 400,
  animationEasing: 'ease',
  dismissAfter: 6000,
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
  const timers = useRef({});

  const [notifications, updateNotifications] = useState({});

  const hideNotification = id => updateNotifications(state => ({
    ...state,
    [id]: {
      ...state[id],
      isVisible: false,
    },
  }));

  const unmountNotification = id => updateNotifications(state => (
    Object.keys(state)
      .filter(notificationId => notificationId !== id)
      .reduce((acc, notificationId) => ({
        ...acc,
        [notificationId]: state[notificationId],
      }), {})
  ));

  const removeNotification = id => () => {
    clearTimeout(timers.current[id]);
    hideNotification(id);
    setTimeout(() => unmountNotification(id), animationDuration);
  };

  const showNotification = (payload = {}) => () => updateNotifications((state) => {
    const id = Date.now().toString();
    timers.current[id] = setTimeout(() => {
      removeNotification(id)();
    }, dismissAfter);
    return {
      ...state,
      [id]: {
        id,
        isVisible: true,
        payload,
      },
    };
  });

  return (
    <NotificationsContext.Provider value={{ showNotification, removeNotification }}>
      <Container position={position}>
        {Object.values(notifications).map(({ id, payload, isVisible }) => (
          <NotificationContainer
            key={id}
            position={position}
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
