import {
  showNotification, hideNotification, hideAllNotifications,
  removeNotification,
} from '../actions';
import {
  RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION, RRN_REMOVE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS,
} from '../constants';

describe('notifications actions', () => {
  const uid = 'testUid';
  describe('showNotification', () => {
    it('should return correct type and passed options object', () => {
      const options = {};
      const expected = { type: RRN_SHOW_NOTIFICATION, options };
      expect(showNotification(options)).toEqual(expected);
    });
  });

  describe('hideNotification', () => {
    it('should return correct type and passed uid', () => {
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

  describe('removeNotification', () => {
    it('should return correct type and passed uid', () => {
      const expected = { type: RRN_REMOVE_NOTIFICATION, uid };
      expect(removeNotification(uid)).toEqual(expected);
    });
  });
});
