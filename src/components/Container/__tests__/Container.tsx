import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Container from '../Container';

const children = <p>test</p>;

const renderComponent = () =>
  render(
    <Container position={['20px', '30px', 'auto', 'auto']}>
      {children}
    </Container>
  );

describe('<Container />', () => {
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
