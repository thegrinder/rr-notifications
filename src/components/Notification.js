import styled from 'styled-components';
import PropTypes from 'prop-types';
import { convertToCssDuration, getAnimatedMargin } from '../helpers/utils';
import {
  horizontalShow,
  horizontalHide,
  verticalShow,
  verticalHide,
} from '../animations/animations';

const propTypes = {
  isVisible: PropTypes.bool.isRequired,
  notificationHeight: PropTypes.number.isRequired,
  position: PropTypes.array.isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationEasing: PropTypes.string.isRequired,
  slideFromSide: PropTypes.string.isRequired,
};

const Notification = styled.div`
  position: relative;
  z-index: ${props => (props.isVisible ? 999999 : -1)};
  animation: ${({ isVisible, position, slideFromSide, notificationHeight }) => {
    const animatedMargin = getAnimatedMargin(position);
    if (slideFromSide) {
      return isVisible
        ? horizontalShow(notificationHeight, animatedMargin, slideFromSide)
        : horizontalHide(notificationHeight, animatedMargin, slideFromSide);
    }
    return isVisible
      ? verticalShow(notificationHeight, animatedMargin)
      : verticalHide(notificationHeight, animatedMargin);
  }};
  animation-timing-function: ${props => props.animationEasing};
  animation-duration: ${props => convertToCssDuration(props.animationDuration)};
  animation-fill-mode: forwards;
`;

Notification.propTypes = propTypes;

export default Notification;
