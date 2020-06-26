import { keyframes } from 'styled-components';
import { verticalShow, verticalHide } from '../animations';

jest.mock('styled-components');

describe('verticalShow, verticalHide', () => {
  const height = 100;
  const animatedMargin = 'left';

  [verticalHide, verticalShow].forEach((animation) => {
    it("it should call styled-components' keyframes method", () => {
      animation(height, animatedMargin);
      expect(keyframes).toBeCalled();
    });
  });
});
