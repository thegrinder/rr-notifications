import { RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS, RRN_SET_NOTIFICATION_HEIGHT } from './constants';

export function showNotification(options = {}) {
  return {
    type: RRN_SHOW_NOTIFICATION,
    options,
  };
}

export function hideNotification(uid) {
  return {
    type: RRN_HIDE_NOTIFICATION,
    uid,
  };
}

export function hideAllNotifications() {
  return {
    type: RRN_HIDE_ALL_NOTIFICATIONS,
  };
}

export function setNotificationHeight(uid, height) {
  return {
    type: RRN_SET_NOTIFICATION_HEIGHT,
    uid,
    height,
  };
}
