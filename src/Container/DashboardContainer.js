import React from 'react';
import ReactModal from 'react-modal';
import './DashboardContainer.css';
import { Link, NavLink } from 'react-router-dom';
import UserInfo from '../Component/UserInfo';
import WalletInfo from '../Component/WalletInfo';
import WalletService from '../service/WalletService';
import TransactionService from '../service/TransactionService';
import TransactionList from '../Component/TransactionList';
import { TopUp } from '../Component/TopUp';
import Notification from '../Component/Notification/Notification';

const { getTransactionByUserId, topUpWallet } = TransactionService;
const { getWalletByUserId } = WalletService;

/**
 * Represent dashboard info for user
 */
class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      wallet: {},
      recentTransactions: [],
      showModalTopUp: false,
      showModalTransfer: false,
      successMessage: '',
      errorMessage: ''
    };
  }

  async componentDidMount() {
    await this._fetchUser();
    await this._fetchWallet();
    await this._fetchRecentTransactions();
  }

  _renderTransactionCardHeader = (title, description) => (
    <div className="card-header">
      <div className="card-title recent-transactions__title">{title}</div>
      <div className="medium grey-text">{description}</div>
    </div>
  );

  _renderSeeAllTransactionLink = () => (
    <div className="card-action clearfix">
      <div className="pull-right">
        <Link to="/transactions">
          <span className="btn btn-link black-text">See all transaction list</span>
          <div className="ripple-wrapper" />
        </Link>
      </div>
    </div>
  );

  _renderRecentTransaction = (recentTransactions) => (
    <div className="col-md-12 recent-transactions">
      <div className="card">
        {this._renderTransactionCardHeader('Recent Transactions', 'Overview from the last five transactions that has been made')}
        <TransactionList transactions={recentTransactions} />
        {this._renderSeeAllTransactionLink()}
      </div>
    </div>
  );

  _handleOpenModalTopUp = () => {
    this.setState({ showModalTopUp: true });
  };

  _handleCloseModalTopUp = () => {
    this.setState({ showModalTopUp: false });
  };

  _handleOpenModalTransfer = () => {
    this.setState({ showModalTransfer: true });
  };

  _handleCloseModalTransfer = () => {
    this.setState({ showModalTransfer: false });
  };

  _handleTopUp = (amount) => {
    this._topUpAmount(amount);
  };

  _renderNotification = (message, isSuccess) => (
    <Notification message={message} success={isSuccess} />
  );

  _topUpAmount = async (amount) => {
    const { user, wallet } = this.state;
    try {
      await topUpWallet(user.id, amount, wallet.id);
      this._fetchWallet();
      this._fetchRecentTransactions();
      this.setState({ showModalTopUp: false });
      this.setState({ successMessage: 'Top up successful' });
    } catch (e) {
      this.setState({ showModalTopUp: false });
      this.setState({ errorMessage: 'Top up failed' });
    }
  };

  async _fetchUser() {
    const localUserData = await localStorage.getItem('User');
    const storageUser = JSON.parse(localUserData);
    this.setState({
      user: storageUser
    });
  }

  async _fetchWallet() {
    const { user } = this.state;
    const { data: wallet } = await getWalletByUserId(user.id);
    this.setState({
      wallet
    });
  }

  async _fetchRecentTransactions() {
    const { user, wallet } = this.state;
    const { data } = await getTransactionByUserId(user.id, 5, wallet.id);
    this.setState({
      recentTransactions: data
    });
  }

  render() {
    const {
      user, wallet, recentTransactions, showModalTopUp, showModalTransfer,
      successMessage, errorMessage
    } = this.state;
    return (
      <>
        {successMessage && this._renderNotification(successMessage, true)}
        <div className="col-md-12 dashboard-info">
          <UserInfo user={user} />
          <div className="card bordered col-md-5 dashboard-info__wallet">
            <WalletInfo wallet={wallet} />
            <div className="card-footer dashboard-info__wallet-card-footer">
              <button id="top-up-button" className="btn btn-warning btn-border dashboard-info__wallet-card-footer--button-top-up" type="button" onClick={this._handleOpenModalTopUp}>
                Top Up
                <div className="ripple-wrapper" />
              </button>
              <NavLink to="/actions">
                <button id="transfer-button" className="btn btn-warning btn-border dashboard-info__wallet-card-footer--button-transfer" type="button">
                Transfer
                  <div className="ripple-wrapper" />
                </button>
              </NavLink>
            </div>
            <ReactModal
              id="top-up-modal"
              className="top-up__modal"
              overlayClassName="top-up__modal-overlay"
              isOpen={showModalTopUp}
              contentLabel="Top Up Modal"
              ariaHideApp={false}
            >
              <div className="modal-header">
                <button id="top-up-close-button" className="btn btn-link btn-flat pull-right" type="button" onClick={this._handleCloseModalTopUp}>X</button>
                <h3 className="modal-title"> Top Up </h3>
              </div>
              <TopUp onSubmit={this._handleTopUp} error={errorMessage} />
            </ReactModal>
            <ReactModal
              id="transfer-modal"
              className="transfer__modal"
              overlayClassName="transfer__modal-overlay"
              isOpen={showModalTransfer}
              contentLabel="Top Up Modal"
              ariaHideApp={false}
            >
              <button id="transfer-close-button" className="btn btn-link btn-flat" type="button" onClick={this._handleCloseModalTransfer}>Close</button>
            </ReactModal>
          </div>
        </div>
        {this._renderRecentTransaction(recentTransactions)}
      </>
    );
  }
}

export default DashboardContainer;
