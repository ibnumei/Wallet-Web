import React from 'react';
import './TransactionFilterDescription.css';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './TransactionFilterAmount.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import constants from '../Constant';
import TransactionList from './TransactionList';

const { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT } = constants;
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

/**
 * Represent amount filter for a list
 */
class TransactionFilterAmount extends React.PureComponent {
  _handleChangeInput = (value) => {
    const { onAmountFilter } = this.props;
    onAmountFilter(value);
  };

  _renderInputType = () => {
    const { value } = this.props;
    return (
      <div className="transaction-filter__range">
        <Range
          id="rangeInput"
          min={MIN_TRANSACTION_AMOUNT}
          max={MAX_TRANSACTION_AMOUNT}
          allowCross={false}
          defaultValue={TransactionFilterAmount.DEFAULT.VALUE}
          value={value}
          onChange={this._handleChangeInput}
        />
      </div>
    );
  };

  render() {
    const { value } = this.props;
    return (
      <div>
        <div className="range">
          <label>
            {`IDR ${numeral(value[0]).format(TransactionList.FORMATS.currency)}`}
          </label>
          <span>{' - '}</span>
          <label>
            {`IDR ${numeral(value[1]).format(TransactionList.FORMATS.currency)}`}
          </label>
        </div>

        <div className="transaction-filter">
          <label className="transaction-filter__input-label">
            <span>Input range amount: </span>
          </label>
          {this._renderInputType()}
        </div>
      </div>
    );
  }
}

TransactionFilterAmount.FORMATS = {
  currency: '0,0[.]00'
};
TransactionFilterAmount.propTypes = {
  onAmountFilter: PropTypes.func.isRequired
};

export default TransactionFilterAmount;

TransactionFilterAmount.DEFAULT = {
  VALUE: [10000, 10000000]
};
