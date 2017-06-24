import { showNotification, hideNotification, hideAllNotifications,
  setNotificationHeight } from '../actions';
import { RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS, RRN_SET_NOTIFICATION_HEIGHT } from '../constants';

describe('notifications actions', () => {
  describe('showNotification', () => {
    it('should return correct type and passed options object', () => {
      const options = {};
      const expected = { type: RRN_SHOW_NOTIFICATION, options };
      expect(showNotification(options)).toEqual(expected);
    });
  });

  describe('hideNotification', () => {
    it('should return correct type and passed uid', () => {
      const uid = 'testUid';
      const expected = { type: RRN_HIDE_NOTIFICATION, uid };
      expect(hideNotification(uid)).toEqual(expected);
    });
  });

  describe('hideAllNotifications', () => {
    it('should return correct type', () => {
      const expected = { type: RRN_HIDE_ALL_NOTIFICATIONS };
      expect(hideAllNotifications()).toEqual(expected);
    });
  });

  describe('setNotificationHeight', () => {
    it('should return correct type and passed uid and height', () => {
      const uid = 'testUid';
      const height = 40;
      const expected = { type: RRN_SET_NOTIFICATION_HEIGHT, uid, height };
      expect(setNotificationHeight(uid, height)).toEqual(expected);
    });
  });
});
