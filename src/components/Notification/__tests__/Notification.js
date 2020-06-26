import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Notification from '../Notification';

const testProps = {
  isVisible: true,
  notificationHeight: 40,
  animationDuration: 400,
  animationEasing: 'ease',
  slideFromSide: 'left',
  position: ['10px', '10px', 'auto', 'auto'],
};
const children = <p>test</p>;
const renderComponent = (props = {}) =>
  render(<Notification {...props}>{children}</Notification>);

describe('<Notification />', () => {
  afterEach(cleanup);

  it('should render correctly if visible', () => {
    const {
      container: { firstChild },
    } = renderComponent(testProps);
    expect(firstChild).toBeDefined();
    expect(firstChild).toMatchSnapshot();
  });

  it('should render correctly if not visible', () => {
    const {
      container: { firstChild },
    } = renderComponent({ ...testProps, isVisible: false });
    expect(firstChild).toBeDefined();
    expect(firstChild).toMatchSnapshot();
  });

  it('should have children', () => {
    const {
      container: { firstChild },
      getByText,
    } = renderComponent(testProps);
    const childrenElement = getByText('test');
    expect(firstChild).toContainElement(childrenElement);
  });
});
