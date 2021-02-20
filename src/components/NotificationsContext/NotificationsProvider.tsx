import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import Container from '../Container/Container';
import { Notification } from '../Notification/Notification';
import { Position } from '../../helpers/utils';
import { NotificationsContext } from './NotificationContext';

export type RemoveNotification = ({
  removeNotification,
  payload,
}: {
  removeNotification: () => void;
  payload: any;
}) => ReactNode;

type NotificationsProviderProps = {
  /** Children */
  children: ReactNode;
  /** Render prop which passes down removeNotification function and notification payload */
  renderNotification: RemoveNotification;
  /** Fixed position where all notifications are displayed */
  position?: Position;
  /** Duration of the show and hide animations in miliseconds */
  animationDuration?: number;
  /** Animation timing function / cubic-bezier */
  animationEasing?: string;
  /** Time in miliseconds after which the notification is automatically dismissed */
  dismissAfter?: number;
};

export const NotificationsProvider = ({
  children,
  renderNotification,
  position = ['40px', '40px', 'auto', 'auto'],
  animationDuration = 400,
  animationEasing = 'ease',
  dismissAfter = 6000,
}: NotificationsProviderProps) => {
  const automaticDismissalTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const manualDismissalTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const appearanceDelayTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const [notifications, updateNotifications] = useState<
    Record<
      string,
      {
        id: string;
        isVisible: boolean;
        payload: any;
      }
    >
  >({});

  const hideNotification = (id: string) =>
    updateNotifications((state) => ({
      ...state,
      [id]: {
        ...state[id],
        isVisible: false,
      },
    }));

  const unmountNotification = (id: string) =>
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

  const showNotification = (id: string) =>
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
