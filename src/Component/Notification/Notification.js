import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Notification.css';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { status: '' };
  }

  _handleClose = () => {
    this.setState({ status: 'closed' });
  };

  _renderSuccessNotification = (message) => {
    const { status } = this.state;
    return (
      <div id="success-notification" className={`success-notification ${status}`}>
        <span id="success-notification-message" className="message">{message}</span>
        <button id="notification-close-button" className="close-button" type="button" onClick={this._handleClose}>
          <i><FontAwesomeIcon icon={faTimesCircle} /></i>
        </button>
      </div>
    );
  };

  _renderErrorNotification = (message) => {
    const { status } = this.state;
    return (
      <div id="error-notification" className={`error-notification ${status}`}>
        <span id="error-notification-message" className="message">{message}</span>
        <button id="notification-close-button" className="close-button" type="button" onClick={this._handleClose}>
          <i><FontAwesomeIcon icon={faTimesCircle} /></i>
        </button>
      </div>
    );
  };

  render() {
    const { message, success } = this.props;
    return (
      <>
        {success && this._renderSuccessNotification(message)}
        {!success && this._renderErrorNotification(message)}
      </>
    );
  }
}

export default Notification;
