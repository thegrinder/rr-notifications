import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';


const propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  hideNotification: PropTypes.func.isRequired,
  unmountNotification: PropTypes.func.isRequired,
  animatedMargin: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationEasing: PropTypes.string.isRequired,
  dismissAfter: PropTypes.number.isRequired,
  slideFromSide: PropTypes.string.isRequired,
};

export class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    this.setState({
      height: this.notification.clientHeight,
    });
    const {
      id,
      hideNotification,
      unmountNotification,
      dismissAfter,
      animationDuration,
    } = this.props;
    setTimeout(() => {
      hideNotification(id);
    }, dismissAfter);
    setTimeout(() => {
      unmountNotification(id);
    }, dismissAfter + animationDuration);
  }

  render() {
    const {
      children,
      animatedMargin,
      isVisible,
      slideFromSide,
      animationEasing,
      animationDuration,
    } = this.props;
    const { height } = this.state;
    return (
      <div ref={(notification) => { this.notification = notification; }}>
        <Notification
          animatedMargin={animatedMargin}
          notificationHeight={height}
          isVisible={isVisible}
          slideFromSide={slideFromSide}
          animationEasing={animationEasing}
          animationDuration={animationDuration}
        >
          {children}
        </Notification>
      </div>
    );
  }
}

NotificationContainer.propTypes = propTypes;

export default NotificationContainer;
