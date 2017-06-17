import { keyframes } from 'styled-components';

const TRANSLATEX = 60;

const verticalShow = (height, animatedMargin) => (
  keyframes`
    0% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
    }
    100% {
      margin-${animatedMargin}: 0px;
      opacity: 1;
    }
  `
);

const verticalHide = (height, animatedMargin) => (
  keyframes`
    0% {
      margin-${animatedMargin}: 0px;
      opacity: 1;
    }
    100% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
    }
  `
);

const horizontalShow = (height, animatedMargin, slideFromSide) => (
  keyframes`
    0% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
    50% {
      margin-${animatedMargin}: 0;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
    100% {
      margin-${animatedMargin}: 0;
      opacity: 1;
      transform: translateX(0%);
    }
  `
);

const horizontalHide = (height, animatedMargin, slideFromSide) => (
  keyframes`
    0%{
      margin-${animatedMargin}: 0;
      opacity: 1;
      transform: translateX(0%);
    }
    50% {
      margin-${animatedMargin}: 0;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
    100% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
      transform: translateX(${slideFromSide === 'left' ? -TRANSLATEX : TRANSLATEX}%);
    }
  `
);

const getAnimation = (props) => {
  const { isVisible, animatedMargin, slideFromSide,
    notificationHeight } = props;
  if (slideFromSide === 'left' || slideFromSide === 'right') {
    return isVisible
      ? horizontalShow(notificationHeight, animatedMargin, slideFromSide)
      : horizontalHide(notificationHeight, animatedMargin, slideFromSide);
  }
  return isVisible
      ? verticalShow(notificationHeight, animatedMargin)
      : verticalHide(notificationHeight, animatedMargin);
};

export default getAnimation;
