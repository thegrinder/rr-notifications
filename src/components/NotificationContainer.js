import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';


const propTypes = {
  id: PropTypes.any.isRequired,
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
    // setTimeout(() => {
    //   this.props.hideNotification(this.props.uid);
    // }, this.props.dismissAfter);
    // setTimeout(() => {
    //   this.props.removeNotification(this.props.uid);
    // }, this.props.dismissAfter + this.props.animationDuration);
  }

  render() {
    return (
      <div ref={(notification) => { this.notification = notification; }}>
        <Notification
          animatedMargin={this.props.animatedMargin}
          notificationHeight={this.state.height}
          isVisible={this.props.isVisible}
          slideFromSide={this.props.slideFromSide}
          animationEasing={this.props.animationEasing}
          animationDuration={this.props.animationDuration}
        >
          {this.props.children}
        </Notification>
      </div>
    );
  }
}

NotificationContainer.propTypes = propTypes;

export default NotificationContainer;
