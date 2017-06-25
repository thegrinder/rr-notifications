import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import { setNotificationHeight, hideNotification } from '../../redux/actions';
import NotificationContainer from '../NotificationContainer';

jest.useFakeTimers();

describe('<NotificationContainer />', () => {
  const mockStore = configureStore();
  let mountedComponent;
  let store;
  const testProps = {
    uid: 1,
    dismissAfter: 1000,
    animatedMargin: 'bottom',
    animationDuration: '.4s',
    animationEasing: 'ease',
  };
  const testNotificationState = { uid: testProps.uid, isVisible: true, height: 20 };
  const testInitialState = {
    notifications: [testNotificationState],
  };

  beforeEach(() => {
    setTimeout.mockClear();
    store = mockStore(testInitialState);
    store.dispatch = jest.fn();
    mountedComponent = mount(
      <Provider store={store}>
        <NotificationContainer {...testProps} />
      </Provider>,
    );
  });

  it('maps state to props', () => {
    expect(mountedComponent.find('NotificationContainer').props())
      .toMatchObject(testNotificationState);
  });

  it('maps dispatch to props', () => {
    expect(mountedComponent.find('NotificationContainer').props()).toMatchObject({
      setNotificationHeight: expect.any(Function),
      hideNotification: expect.any(Function),
    });
  });

  it('dispatches setNotificationHeight and then hideNotification', () => {
    const { uid, dismissAfter } = testProps;
    // clientHeight is 0 in the test environment
    expect(store.dispatch).toHaveBeenCalledWith(setNotificationHeight(uid, 0));
    jest.runAllTimers();
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(dismissAfter);
    expect(store.dispatch).toHaveBeenCalledWith(hideNotification(uid));
  });
});
