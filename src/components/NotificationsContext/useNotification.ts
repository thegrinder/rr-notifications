import { useContext } from 'react';
import { NotificationsContext } from './NotificationContext';

export const useNotification = () => useContext(NotificationsContext);
