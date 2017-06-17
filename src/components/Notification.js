import styled from 'styled-components';
import { oneOf, number, bool, string } from 'prop-types';
import getAnimation from '../animations/animations';

const Notification = styled.div`
  animation: ${props => getAnimation(props)};
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
  slideFromSide: oneOf(['left', 'right']),
};

export default Notification;

