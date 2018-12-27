import styled from 'styled-components';
import PropTypes from 'prop-types';
import getAnimation from '../animations/getAnimation';
import { convertToCssDuration } from '../helpers/utils';

const Notification = styled.div`
  position: relative;
  z-index: ${props => (props.isVisible ? 999999 : -1)};
  animation: ${props => getAnimation(props)};
  animation-timing-function: ${props => props.animationEasing};
  animation-fill-mode: forwards;
  animation-duration: ${props => convertToCssDuration(props.animationDuration)}
`;

Notification.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  notificationHeight: PropTypes.number.isRequired,
  animatedMargin: PropTypes.oneOf(['bottom', 'top']).isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationEasing: PropTypes.string.isRequired,
  slideFromSide: PropTypes.string.isRequired,
};

export default Notification;
