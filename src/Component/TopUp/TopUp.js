import React from 'react';
import './TopUp.css';
import '../../App.css';
import constant from '../../Constant';

const { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT } = constant;

class TopUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { amount: '', errorMessage: '' };
  }

  _changeHandler = (event) => {
    const { value } = event.target;
    this._handleTopUp(value);
  };

  _handleTopUp = (amount) => {
    this.setState({ errorMessage: '' });
    const isBelowMinimumTransaction = parseInt(amount, 10) < MIN_TRANSACTION_AMOUNT;
    const isAboveMaximumTransaction = parseInt(amount, 10) > MAX_TRANSACTION_AMOUNT;
    const invalidRange = isBelowMinimumTransaction || isAboveMaximumTransaction;
    const errorMessage = invalidRange ? 'Top up amount must be between IDR 10,000 - IDR 10,000,000' : '';
    this.setState({
      amount,
      errorMessage
    });
  };

  _clickHandler = () => {
    const { onSubmit } = this.props;
    const { amount } = this.state;
    onSubmit(amount);
  };

  _renderNotification = (message) => (
    <p className="error-message-text">{message}</p>
  );

  _renderButton = (errorMessage) => {
    const { amount } = this.state;
    const invalidAmount = errorMessage || amount === '';
    const className = invalidAmount ? 'btn btn-disabled' : 'btn btn-info modal-button';
    return (
      <button
        disabled={!!invalidAmount}
        id="top-up-button"
        className={className}
        type="button"
        onClick={this._clickHandler}
      >
        Top Up
      </button>
    );
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="modal-body">
        <div>
          <label htmlFor="inputEmail" className="control-label">
            <input type="number" min="0" placeholder="top up amount" className="form-control" id="top-up-field" name="top-up-field" onChange={this._changeHandler} />
          </label>
          {this._renderButton(errorMessage)}
          {!!errorMessage && this._renderNotification(errorMessage)}
        </div>
      </div>
    );
  }
}

export default TopUp;
