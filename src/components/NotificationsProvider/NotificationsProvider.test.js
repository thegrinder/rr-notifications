import React, { useContext } from 'react';
import { mount } from 'enzyme';
import NotificationsProvider, { NotificationsContext } from './NotificationsProvider';

const TestChild = () => {
  const { showNotification } = useContext(NotificationsContext);
  return (
    <button type="button" className="show-button" onClick={showNotification}>
      show notification
    </button>
  );
};

const children = <TestChild />;

const Notification = () => (
  <div className="notification">
    notification
  </div>
);

const requiredProps = {
  children,
  renderNotification: Notification,
};

const optionalProps = {
  position: ['40px', '40px', 'auto', 'auto'],
  animationDuration: 400,
  animationEasing: 'ease',
};

const mountComponent = (props = {}) => mount(
  <NotificationsProvider {...requiredProps} {...props}>
    {children}
  </NotificationsProvider>,
);

describe('<NotificationsProvider />', () => {
  it('should render correctly', () => {
    const mountedComponent = mountComponent();
    expect(mountedComponent).toBeDefined();
  });

  it('should have children', () => {
    const mountedComponent = mountComponent();
    expect(mountedComponent.contains(children)).toEqual(true);
  });

  it('should accept certain props', () => {
    const mountedComponent = mountComponent(optionalProps);
    expect(mountedComponent.props()).toMatchObject({
      ...requiredProps,
      ...optionalProps,
    });
  });

  it('should render two notifications', () => {
    const mountedComponent = mountComponent();
    mountedComponent.find('.show-button').simulate('click');
    mountedComponent.find('.show-button').simulate('click');
    expect(mountedComponent.find('.notification').length).toEqual(2);
  });
});
