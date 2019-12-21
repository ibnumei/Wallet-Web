import React from 'react';
import './TransactionFilterDescription.css';
import PropTypes from 'prop-types';

/**
 * Represent description filter for a transaction list
 */
class TransactionFilterDescription extends React.PureComponent {
  _handleChange = (event) => {
    const { onFilter } = this.props;
    const {
      target: {
        value
      }
    } = event;
    onFilter(value);
  };

  render() {
    return (
      <div className="pull-right">
        <input placeholder="search by description" className="transaction-filter__input-field" id="filter" type="text" onChange={this._handleChange} />
      </div>
    );
  }
}

TransactionFilterDescription.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default TransactionFilterDescription;
