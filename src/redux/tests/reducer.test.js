import notifications, { initialState } from '../reducer';
import { showNotification, hideNotification, hideAllNotifications,
  setNotificationHeight, removeNotification } from '../actions';

describe('notifications reducer', () => {
  const uid = 'testUid';
  it('returns the initial state', () => {
    expect(notifications(undefined, {})).toEqual(initialState);
  });

  it('should handle showNotification properly', () => {
    const options = { uid };
    const expected = [
      ...initialState,
      { uid, options, isVisible: true, height: 0 },
    ];
    expect(notifications(initialState, showNotification(options))).toEqual(expected);
  });

  it('should handle hideNotification properly', () => {
    const testState = [{ uid, isVisible: true }];
    const expected = [{ uid, isVisible: false }];
    expect(notifications(testState, hideNotification(uid))).toEqual(expected);
  });

  it('should handle hideAllNotifications properly', () => {
    const testState = [
      { uid: 1, isVisible: true },
      { uid: 2, isVisible: true },
    ];
    const expectedState = [
      { uid: 1, isVisible: false },
      { uid: 2, isVisible: false },
    ];
    expect(notifications(testState, hideAllNotifications())).toEqual(expectedState);
  });

  it('should handle setNotificationHeight properly', () => {
    const targetHeight = 40;
    const nonTargetNotification = { uid: 2, height: 20 };
    const testState = [{ uid, height: 0 }, nonTargetNotification];
    const expected = [{ uid, height: targetHeight }, nonTargetNotification];
    expect(notifications(testState, setNotificationHeight(uid, targetHeight)))
      .toEqual(expected);
  });

  it('should handle removeNotification properly', () => {
    const nonTargetNotification = { uid: 'aontherTestUid' };
    const testState = [{ uid }, nonTargetNotification];
    const expected = [nonTargetNotification];
    expect(notifications(testState, removeNotification(uid)))
      .toEqual(expected);
  });
});
