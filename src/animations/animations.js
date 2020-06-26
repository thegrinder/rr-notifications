import { keyframes } from 'styled-components';

export const verticalShow = (height, animatedMargin) =>
  keyframes`
    0% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
    }
    100% {
      margin-${animatedMargin}: 0px;
      opacity: 1;
    }
  `;

export const verticalHide = (height, animatedMargin) =>
  keyframes`
    0% {
      margin-${animatedMargin}: 0px;
      opacity: 1;
    }
    100% {
      margin-${animatedMargin}: ${-height}px;
      opacity: 0;
    }
  `;
