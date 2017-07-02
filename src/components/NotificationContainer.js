import React, { Component } from 'react';
import { func, string, bool, object,
  number, oneOf, any } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification, removeNotification } from '../redux/actions';
import Notification from '../components/Notification';


const propTypes = {
  uid: any.isRequired,
  hideNotification: func.isRequired,
  removeNotification: func.isRequired,
  animatedMargin: string.isRequired,
  isVisible: bool.isRequired,
  animationDuration: number.isRequired,
  animationEasing: string.isRequired,
  dismissAfter: number.isRequired,
  slideFromSide: oneOf(['left', 'right']),
  options: object,
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
    setTimeout(() => {
      this.props.hideNotification(this.props.uid);
    }, this.props.dismissAfter);
    setTimeout(() => {
      this.props.removeNotification(this.props.uid);
    }, this.props.dismissAfter + this.props.animationDuration);
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

function mapStateToProps({ notifications }, props) {
  const { isVisible, options } = notifications.find(notification => (
    notification.uid === props.uid
  ));
  return {
    isVisible,
    options,
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    hideNotification,
    removeNotification,
  }, dispatch),
)(NotificationContainer);
