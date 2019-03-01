import React, { useContext } from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import NotificationsProvider, { NotificationsContext } from '../NotificationsProvider';

const TestChild = () => {
  const { showNotification } = useContext(NotificationsContext);
  return (
    <button type="button" onClick={showNotification}>
      show notification
    </button>
  );
};

const children = <TestChild />;

const Notification = () => (
  <div>
    notification
  </div>
);

const requiredProps = {
  renderNotification: Notification,
};

const optionalProps = {
  position: ['40px', '40px', 'auto', 'auto'],
  animationDuration: 400,
  animationEasing: 'ease',
};

const renderComponent = (props = {}) => render(
  <NotificationsProvider {...requiredProps} {...props}>
    {children}
  </NotificationsProvider>,
);

describe('<NotificationsProvider />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container: { firstChild } } = renderComponent();
    expect(firstChild).toBeDefined();
    expect(firstChild).toMatchSnapshot();
  });

  it('should have children', () => {
    const { container, getByText } = renderComponent();
    const childrenElement = getByText('show notification');
    expect(container).toContainElement(childrenElement);
  });

  it('should render correctly with custom props', () => {
    const { container: { firstChild } } = renderComponent(optionalProps);
    expect(firstChild).toMatchSnapshot();
  });

  it('should render two notifications', () => {
    const { container, getAllByText, getByText } = renderComponent();
    const button = getByText('show notification');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(getAllByText('notification').length).toEqual(2);
    expect(container).toMatchSnapshot();
  });
});
