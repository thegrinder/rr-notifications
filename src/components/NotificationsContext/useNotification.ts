import { useContext } from 'react';
import { NotificationsContext } from './NotificationContext';

export const useNotification = () => {
  const notificationsContext = useContext(NotificationsContext);
  if (!notificationsContext) {
    throw new Error('You should useNotification inside NotificationsProvider');
  }
  return notificationsContext;
};
