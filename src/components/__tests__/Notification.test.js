import React from 'react';
import { shallow, mount } from 'enzyme';
import Notification from '../Notification';

const testProps = {
  isVisible: true,
  notificationHeight: 40,
  animationDuration: 400,
  animationEasing: 'ease',
  slideFromSide: 'left',
  position: ['10px', '10px', 'auto', 'auto'],
};
const children = (<p>test</p>);
const renderComponent = (props = {}) => shallow(
  <Notification {...props}>
    {children}
  </Notification>,
);

const mountComponent = (props = {}) => mount(
  <Notification {...props}>
    {children}
  </Notification>,
);

describe('<Notification />', () => {
  it('should render correctly', () => {
    const renderedComponent = renderComponent(testProps);
    expect(renderedComponent.type()).toBeDefined();
  });

  it('should have children', () => {
    const renderedComponent = renderComponent(testProps);
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should accept certain props', () => {
    const mountedComponent = mountComponent(testProps);
    expect(mountedComponent.props()).toMatchObject(testProps);
  });
});
