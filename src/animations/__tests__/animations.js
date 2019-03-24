import { keyframes } from 'styled-components';
import {
  horizontalShow,
  horizontalHide,
  verticalShow,
  verticalHide,
} from '../animations';

jest.mock('styled-components');

describe('horizontalShow, horizontalHide, verticalShow, verticalHide', () => {
  const height = 100;
  const animatedMargin = 'left';
  const slideFromSide = 'left';

  [verticalHide, verticalShow].forEach((animation) => {
    it('it should call styled-components\' keyframes method', () => {
      animation(height, animatedMargin);
      expect(keyframes).toBeCalled();
    });
  });

  [horizontalHide, horizontalShow].forEach((animation) => {
    it('it should call styled-components\' keyframes method', () => {
      animation(height, animatedMargin, slideFromSide);
      expect(keyframes).toBeCalled();
    });
  });

  [horizontalHide, horizontalShow].forEach((animation) => {
    it('it should call styled-components\' keyframes method', () => {
      animation(height, animatedMargin);
      expect(keyframes).toBeCalled();
    });
  });
});
