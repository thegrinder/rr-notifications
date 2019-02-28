import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Container from '../Container';

const position = ['20px', '30px', 'auto', 'auto'];
const children = (<p>test</p>);
const renderComponent = (props = {}) => render(
  <Container {...props}>
    {children}
  </Container>,
);

describe('<Container />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container: { firstChild } } = renderComponent({ position });
    expect(firstChild).toBeDefined();
    expect(firstChild).toMatchSnapshot();
  });

  it('should have children', () => {
    const { container: { firstChild }, getByText } = renderComponent({ position });
    const childrenElement = getByText('test');
    expect(firstChild).toContainElement(childrenElement);
  });
});
