import { RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION, RRN_REMOVE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS } from './constants';

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

export function removeNotification(uid) {
  return {
    type: RRN_REMOVE_NOTIFICATION,
    uid,
  };
}

export function hideAllNotifications() {
  return {
    type: RRN_HIDE_ALL_NOTIFICATIONS,
  };
}
