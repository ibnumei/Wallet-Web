import React from 'react';
import PropTypes from 'prop-types';
import './TransactionSorting.css';

/**
 * Represent sorting elements for transactions list
 */
class TransactionSorting extends React.PureComponent {
    _handleChange = (event) => {
      const { onSortDate, onSortAmount } = this.props;
      const { value } = event.target;

      if (value === 'newest-date' || value === 'oldest-date') {
        onSortDate(value);
      }
      if (value === 'highest-amount' || value === 'lowest-amount') {
        onSortAmount(value);
      }
    };

    _renderSelectOption= () => {
      const { sortValue } = this.props;
      return (
        <select className="transaction-sort__option" id="sort-input" name="sort" onChange={this._handleChange}>
          <option value="newest-date" selected={sortValue === TransactionSorting.VALUE.NEWSEST}>Newest Date</option>
          <option value="oldest-date" selected={sortValue === TransactionSorting.VALUE.OLDEST}>Oldest Date</option>
          <option value="highest-amount" selected={sortValue === TransactionSorting.VALUE.HIGHEST}>Highest Amount</option>
          <option value="lowest-amount" selected={sortValue === TransactionSorting.VALUE.LOWEST}>Lowest Amount</option>
        </select>
      );
    };

    render() {
      return (
        <div className="pull-left">
          <div className="transaction-sort">
            <label className="transaction-sort__input-label">
              <span>Sort By: </span>
            </label>
            {this._renderSelectOption()}
          </div>
        </div>
      );
    }
}

TransactionSorting.propTypes = {
  onSortDate: PropTypes.func.isRequired,
  onSortAmount: PropTypes.func.isRequired
};

TransactionSorting.VALUE = {
  NEWSEST: 'newest-date',
  OLDEST: 'oldest-date',
  HIGHEST: 'highest-amount',
  LOWEST: 'lowest-amount'
};

export default TransactionSorting;
