import React from 'react';
import PropTypes from 'prop-types';
import './TransactionList.css';
import moment from 'moment';
import numeral from 'numeral';

/**
 * Represents list of transactions
 */
class TransactionList extends React.PureComponent {
    _renderBeneficiaryName = (beneficiaryData) => {
      if (!beneficiaryData) return '';
      return `${beneficiaryData.name} ($${beneficiaryData.cashtag})`;
    };

    _renderListItem = (transactions) => transactions.map((transaction) => (
      <tr key={transaction.id}>
        <td>{moment(transaction.createdAt).format(TransactionList.FORMATS.date)}</td>
        {this._renderTransactionType(transaction.type)}
        <td className="nominal">
          {`IDR ${numeral(transaction.nominal).format(TransactionList.FORMATS.currency)}`}
        </td>
        <td>{transaction.description}</td>
        <td>{this._renderBeneficiaryName(transaction.beneficiaryData)}</td>
      </tr>
    ));

    _renderTransactionType = (type) => {
      if (type === 'withdraw') return (<td><div className="withdraw-transaction">{type}</div></td>);
      return (
        <td><div className="deposit-transaction">{type}</div></td>
      );
    };

    _renderHeaderTable = () => (
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Nominal</th>
          <th>Description</th>
          <th>Beneficiary</th>
        </tr>
      </thead>
    );

    render() {
      const { transactions } = this.props;
      return (
        <>
          <div className="table-responsive">
            <table className="table table-full table-full-small table-dashboard-widget-1">
              {this._renderHeaderTable()}
              <tbody id="transaction-list">
                {this._renderListItem(transactions)}
              </tbody>
            </table>
          </div>
        </>
      );
    }
}

TransactionList.FORMATS = {
  date: 'YYYY-MM-DD H:mm:ss A',
  currency: '0,0[.]00'
};

TransactionList.defaultProps = {
  transactions: {}
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      walletId: PropTypes.number,
      nominal: PropTypes.number,
      type: PropTypes.string,
      description: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      beneficiaryData: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    })
  )
};

export default TransactionList;
