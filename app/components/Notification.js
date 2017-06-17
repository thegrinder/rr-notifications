import styled, { keyframes } from 'styled-components';
import { oneOf, number, bool, string } from 'prop-types';

const show = (height, animatedMargin) => (
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

const hide = (height, animatedMargin) => (
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

const Notification = styled.div`
  padding: 10px;
  background-color: #ddd;
  color: #fff;
  animation: ${props => (
    props.isVisible
      ? show(props.notificationHeight, props.animatedMargin)
      : hide(props.notificationHeight, props.animatedMargin)
  )};
  animation-timing-function: ${props => props.animationEasing};
  animation-duration: ${props => props.animationDuration};
  animation-fill-mode: forwards;
  z-index: ${props => (props.isVisible ? 999999 : -1)};
  position: relative;
`;

Notification.propTypes = {
  isVisible: bool.isRequired,
  notificationHeight: number.isRequired,
  animatedMargin: oneOf(['bottom', 'top']).isRequired,
  animationDuration: string.isRequired,
  animationEasing: string.isRequired,
};

export default Notification;

