import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideNotification } from 'redux/actions';

export default function notificationFactory(WrappedNotification) {
  const propTypes = {
    hideNotification: func.isRequired,
  };

  class Notification extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height: 0,
      };
      this.handleHidingNotification = this.handleHidingNotification.bind(this);
    }
    componentDidMount() {
      this.setState({
        height: this.notification.clientHeight,
      });
    }
    handleHidingNotification() {
      this.props.hideNotification(this.props.uid);
    }
    render() {
      return (
        <div ref={(notification) => { this.notification = notification; }}>
          <WrappedNotification
            notificationHeight={this.state.height}
            hideNotification={this.handleHidingNotification}
            isVisible={this.props.isVisible}
            index={this.props.index}
          />
        </div>
      );
    }
  }

  Notification.propTypes = propTypes;

  function mapStateToProps({ notifications }, props) {
    const { isVisible } = notifications.find(x => x.uid === props.uid);
    return {
      isVisible,
    };
  }

  return connect(
    mapStateToProps,
    dispatch => bindActionCreators({ hideNotification }, dispatch),
  )(Notification);
}
