import { RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS } from './constants';

export function showNotification(opts, status = 'default') {
  return {
    type: RRN_SHOW_NOTIFICATION,
    opts,
    status,
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
