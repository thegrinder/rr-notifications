import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { NotificationsProvider } from '../NotificationsProvider';
import { NotificationsContext } from '../NotificationContext';

const TestChild = () => {
  const { addNotification } = useContext(NotificationsContext);
  return (
    <button type="button" onClick={() => addNotification({})}>
      show notification
    </button>
  );
};

const children = <TestChild />;

const Notification = ({ removeNotification }) => (
  <div>
    <button type="button" onClick={() => removeNotification('test')}>
      notification
    </button>
  </div>
);

Notification.propTypes = {
  removeNotification: PropTypes.func.isRequired,
};

const requiredProps = {
  renderNotification: Notification,
};

const animationDuration = 400;

const optionalProps = {
  animationDuration,
  position: ['40px', '40px', 'auto', 'auto'],
  animationEasing: 'ease',
};

const renderComponent = (props = {}) =>
  render(
    <NotificationsProvider {...requiredProps} {...props}>
      {children}
    </NotificationsProvider>
  );

describe('<NotificationsProvider />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toBeDefined();
  });

  it('should have children', () => {
    const { container, getByText } = renderComponent();
    const childrenElement = getByText('show notification');
    expect(container).toContainElement(childrenElement);
  });

  it('should properly handle opening and manually closing notifications', () => {
    jest.useFakeTimers();

    const { getAllByText, getByText } = renderComponent();
    const button = getByText('show notification');

    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      fireEvent.click(button);
    });

    expect(getAllByText('notification').length).toEqual(2);
    act(() => {
      fireEvent.click(getAllByText('notification')[0]);
    });
    act(() => {
      jest.advanceTimersByTime(animationDuration);
    });
    expect(getAllByText('notification').length).toEqual(1);
  });

  it('should automatically dismiss notifications', () => {
    jest.useFakeTimers();

    const { queryAllByText, getByText } = renderComponent();
    const button = getByText('show notification');

    act(() => {
      fireEvent.click(button);
    });

    act(() => {
      fireEvent.click(button);
    });

    expect(queryAllByText('notification').length).toEqual(2);
    act(() => {
      jest.runAllTimers();
    });
    expect(queryAllByText('notification').length).toEqual(0);
  });
});
