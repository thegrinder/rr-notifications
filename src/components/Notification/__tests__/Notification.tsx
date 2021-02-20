import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Position } from '../../../helpers/utils';
import { Notification } from '../Notification';

const children = <p>test</p>;
const position: Position = ['20px', '30px', 'auto', 'auto'];
const props = {
  position,
  isVisible: true,
  animationDuration: 100,
  animationEasing: 'ease',
};

const renderComponent = () =>
  render(<Notification {...props}>{children}</Notification>);

describe('<Notification />', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toBeDefined();
  });

  it('should have children', () => {
    const {
      container: { firstChild },
      getByText,
    } = renderComponent();
    const childrenElement = getByText('test');
    expect(firstChild).toContainElement(childrenElement);
  });
});
