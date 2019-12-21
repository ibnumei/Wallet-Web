import React from 'react';
import PropTypes from 'prop-types';
import './WalletInfo.css';
import numeral from 'numeral';

/**
 * Represent info of the wallet balance
 */
class WalletInfo extends React.PureComponent {
  _renderWalletBalance = () => {
    const { wallet } = this.props;
    return (
      <div className="card-content">
        <span id="balance" className="dashboard-info__wallet-balance">
            IDR
          <h1 className="dashboard-info__wallet-balance-text">{numeral(wallet.balance).format(WalletInfo.FORMATS.currency)}</h1>
        </span>
      </div>
    );
  };

  _renderCardHeader = () => (
    <div className="card-header dashboard-info__wallet-title">
      <span className="card-title">Balance</span>
    </div>
  );


  render() {
    return (
      <>
        {this._renderCardHeader()}
        {this._renderWalletBalance()}
      </>
    );
  }
}

WalletInfo.FORMATS = {
  currency: '0,0[.]00'
};

WalletInfo.defaultProps = {
  wallet: {}
};

WalletInfo.propTypes = {
  wallet: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    balance: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })
};

export default WalletInfo;
