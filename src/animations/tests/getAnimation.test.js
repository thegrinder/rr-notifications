import getAnimation from '../getAnimation';
import { horizontalShow, horizontalHide, verticalShow,
  verticalHide } from '../animations';

jest.mock('../animations');

describe('getAnimation()', () => {
  const height = 40;
  const margin = 'bottom';
  const side = 'left';
  const invalidSide = 'bottom';
  const props = { notificationHeight: height, animatedMargin: margin };
  const horizontalAnimationProps = { ...props, slideFromSide: side };

  test('calls horizontalShow with the right arguments', () => {
    getAnimation({ ...horizontalAnimationProps, isVisible: true });
    expect(horizontalShow).toBeCalledWith(height, margin, side);
  });

  test('calls horizontalHide with the right arguments', () => {
    getAnimation({ ...horizontalAnimationProps, isVisible: false });
    expect(horizontalHide).toBeCalledWith(height, margin, side);
  });

  test('calls verticalShow with the right arguments', () => {
    getAnimation({ ...props, isVisible: true });
    expect(verticalShow).toBeCalledWith(height, margin);
  });

  test('calls verticalHide with the right arguments', () => {
    getAnimation({ ...props, isVisible: false });
    expect(verticalHide).toBeCalledWith(height, margin);
  });

  test('calls verticalAnimation if slideFromSide invalid', () => {
    getAnimation({ ...props, slideFromSide: invalidSide, isVisible: true });
    expect(verticalShow).toBeCalled();
    getAnimation({ ...props, slideFromSide: invalidSide, isVisible: false });
    expect(verticalHide).toBeCalled();
  });
});
