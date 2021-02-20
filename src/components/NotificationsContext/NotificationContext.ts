import { createContext } from 'react';

type NotificationsContextShape = {
  addNotification: (payload: any) => void;
  removeNotification: (notificationId: string) => void;
};

export const NotificationsContext = createContext<
  NotificationsContextShape | undefined
>(undefined);
