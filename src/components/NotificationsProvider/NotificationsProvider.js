import React, {
  createContext,
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/Container';
import Notification from '../Notification/Notification';

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
};

const defaultProps = {
  position: ['40px', '40px', 'auto', 'auto'],
  animationDuration: 400,
  animationEasing: 'ease',
  dismissAfter: 6000,
};

const NotificationsProvider = ({
  children,
  renderNotification,
  position,
  animationDuration,
  animationEasing,
  dismissAfter,
}) => {
  const automaticDismissalTimers = useRef({});
  const manualDismissalTimers = useRef({});
  const appearanceDelayTimers = useRef({});

  const [notifications, updateNotifications] = useState({});

  const hideNotification = (id) =>
    updateNotifications((state) => ({
      ...state,
      [id]: {
        ...state[id],
        isVisible: false,
      },
    }));

  const unmountNotification = (id) =>
    updateNotifications((state) =>
      Object.keys(state)
        .filter((notificationId) => notificationId !== id)
        .reduce(
          (acc, notificationId) => ({
            ...acc,
            [notificationId]: state[notificationId],
          }),
          {}
        )
    );

  const removeNotification = useCallback(
    (id) => () => {
      clearTimeout(automaticDismissalTimers.current[id]);
      clearTimeout(appearanceDelayTimers.current[id]);
      hideNotification(id);
      manualDismissalTimers.current[id] = setTimeout(() => {
        unmountNotification(id);
      }, animationDuration);
    },
    [animationDuration]
  );

  const mountNotification = useCallback(
    (id, payload) => {
      updateNotifications((state) => {
        automaticDismissalTimers.current[id] = setTimeout(() => {
          removeNotification(id)();
        }, dismissAfter);
        return {
          ...state,
          [id]: {
            id,
            isVisible: false,
            payload,
          },
        };
      });
    },
    [dismissAfter, removeNotification]
  );

  const showNotification = (id) =>
    updateNotifications((state) => ({
      ...state,
      [id]: {
        ...state[id],
        isVisible: true,
      },
    }));

  const addNotification = useCallback(
    (payload = {}) => {
      const id = Date.now().toString();
      mountNotification(id, payload);
      appearanceDelayTimers.current[id] = setTimeout(() => {
        showNotification(id);
      }, 100);
    },
    [mountNotification]
  );

  const clearAllTimeouts = () => {
    [
      ...Object.values(manualDismissalTimers.current),
      ...Object.values(automaticDismissalTimers.current),
      ...Object.values(appearanceDelayTimers.current),
    ].forEach((timeout) => clearTimeout(timeout));
  };

  useEffect(() => clearAllTimeouts, []);

  const value = useMemo(
    () => ({
      addNotification,
      removeNotification,
    }),
    [removeNotification, addNotification]
  );

  return (
    <NotificationsContext.Provider value={value}>
      <Container position={position}>
        {Object.values(notifications).map(({ id, payload, isVisible }) => (
          <Notification
            key={id}
            position={position}
            animationDuration={animationDuration}
            animationEasing={animationEasing}
            dismissAfter={dismissAfter}
            isVisible={isVisible}
          >
            {renderNotification({
              removeNotification: removeNotification(id),
              payload,
            })}
          </Notification>
        ))}
      </Container>
      {children}
    </NotificationsContext.Provider>
  );
};

NotificationsProvider.propTypes = propTypes;
NotificationsProvider.defaultProps = defaultProps;

export default NotificationsProvider;
