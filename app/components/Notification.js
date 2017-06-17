import styled, { keyframes } from 'styled-components';
import { oneOf, number, bool } from 'prop-types';

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
  )} .4s forwards;
  z-index: ${props => 999999 - props.index};
  position: relative;
`;

Notification.propTypes = {
  isVisible: bool.isRequired,
  notificationHeight: number.isRequired,
  animatedMargin: oneOf(['bottom', 'top']).isRequired,
  index: number.isRequired,
};

export default Notification;

