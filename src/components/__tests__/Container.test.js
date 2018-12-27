import React from 'react';
import { shallow, mount } from 'enzyme';
import Container from '../Container';

const position = ['20px', '30px', 'auto', 'auto'];
const children = (<p>test</p>);
const renderComponent = (props = {}) => shallow(
  <Container {...props}>
    {children}
  </Container>,
);
const mountComponent = (props = {}) => mount(
  <Container {...props} />,
);

describe('<Container />', () => {
  it('should render <div> tag', () => {
    const renderedComponent = renderComponent({ position });
    expect(renderedComponent).toBeDefined();
  });

  it('should have children', () => {
    const renderedComponent = renderComponent({ position });
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should accept position  props', () => {
    const mountedComponent = mountComponent({ position });
    expect(mountedComponent.prop('position')).toEqual(position);
  });
});
