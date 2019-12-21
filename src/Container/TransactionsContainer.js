import React from 'react';
import Modal from 'react-modal';
import TransactionList from '../Component/TransactionList';
import './TransactionsContainer.css';
import TransactionFilterDescription from '../Component/TransactionFilterDescription';
import TransactionFilterAmount from '../Component/TransactionFilterAmount';
import TransactionSorting from '../Component/TransactionSorting';
import WalletService from '../service/WalletService';
import TransactionService from '../service/TransactionService';

const { getTransactionByUserId } = TransactionService;
const { getWalletByUserId } = WalletService;
/**
 * Represent container for transaction list components
 */
class TransactionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      filteredTransactions: [],
      wallet: {},
      user: {},
      filterInput: '',
      filterAmount: [10000, 10000000],
      sortValue: TransactionSorting.VALUE.NEWSEST,
      isModalOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    await this._fetchUser();
    await this._fetchWallet();
    try {
      const { user, wallet } = this.state;
      const response = await getTransactionByUserId(user.id, null, wallet.id);
      this.setState({ transactions: response.data, filteredTransactions: response.data });
    } catch (e) {
      console.log(e.message);
    }
  }

  _handleFilter = (inputText) => {
    this.setState({ filterInput: inputText });
  };

  _handleSortDate = (sortValue) => {
    this.setState({
      sortValue
    });
  };


  _filterByDescription = (filteredTransaction) => {
    const { filterInput } = this.state;
    return filteredTransaction.filter(
      (transaction) => transaction.description.toLowerCase().includes(filterInput.toLowerCase())
    );
  };

  _handleSortAmount = (sortValue) => {
    this.setState({
      sortValue
    });
  };

  _filterByAmount = () => {
    const { filterAmount, transactions } = this.state;
    const greaterThan = parseInt(filterAmount[0], 10);
    const lessThan = parseInt(filterAmount[1], 10);

    return transactions
      .filter((transaction) => transaction
        .nominal >= greaterThan && transaction.nominal <= lessThan);
  };

  _displayTransactions = () => {
    const { filteredTransactions } = this.state;
    return this
      ._filterByDescription(filteredTransactions);
  };

  _handleAmountFilter = (inputAmount) => {
    this.setState({ filterAmount: inputAmount });
  };

  _renderCardHeader = (title, description) => (
    <div className="card-header">
      <div className="card-title recent-transactions__title">{title}</div>
      <div className="medium grey-text">{description}</div>
    </div>
  );


  _renderTransactionList = (filteredTransaction) => (
    <div>
      {this._renderCardHeader('Transaction List', 'Your past transactions')}
      <div className="row">
        <button type="button" className="btn sort-filter-button" onClick={this.openModal}>Sort & Filter</button>
        <TransactionFilterDescription onFilter={this._handleFilter} />
      </div>
      <div className="row" id="transaction-list-table">
        <TransactionList transactions={filteredTransaction} />
      </div>
    </div>
  );

  _handleClick = () => {
    const { sortValue } = this.state;
    let filteredTransactions = this._filterByAmount();
    if (sortValue === 'highest-amount' || sortValue === 'lowest-amount') {
      filteredTransactions = this._sortTransactionAmount(filteredTransactions);
    }
    if (sortValue === 'newest-date' || sortValue === 'oldest-date') {
      filteredTransactions = this._sortTransactionsDate(filteredTransactions);
    }
    this.setState({ filteredTransactions, isModalOpen: false });
  };

  _renderApplyButton = () => (
    <div className="pull-right">
      <div className="transaction-sort-filter__button">
        <button type="submit" id="filter-sort-button" className="btn btn-primary button-apply" onClick={this._handleClick}>
          Apply
          <div className="ripple-wrapper" />
        </button>
      </div>
    </div>
  );

  _renderSortAndFilter = () => {
    const { isModalOpen, sortValue, filterAmount } = this.state;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="modal-header">Sort & Filter</h2>
        <div className="row">
          <TransactionSorting
            onSortDate={this._handleSortDate}
            onSortAmount={this._handleSortAmount}
            sortValue={sortValue}
          />
        </div>
        <div className="row">
          <TransactionFilterAmount onAmountFilter={this._handleAmountFilter} value={filterAmount} />
        </div>
        {this._renderApplyButton()}
      </Modal>
    );
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

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  _sortTransactionsDate(transactions) {
    const { sortValue } = this.state;
    const sortedTransactions = transactions;
    if (sortValue === 'oldest-date') {
      return sortedTransactions.sort(
        (firstTransaction, secondTransaction) => new Date(firstTransaction
          .createdAt) - new Date(secondTransaction.createdAt)
      );
    }
    return sortedTransactions.sort(
      (firstTransaction, secondTransaction) => new Date(secondTransaction
        .createdAt) - new Date(firstTransaction.createdAt)
    );
  }

  _sortTransactionAmount(transactions) {
    const { sortValue } = this.state;
    const sortedTransactions = transactions;
    if (sortValue === 'highest-amount') {
      return sortedTransactions.sort(
        (firstTransaction, secondTransaction) => secondTransaction
          .nominal - firstTransaction.nominal
      );
    }
    return sortedTransactions.sort(
      (firstTransaction, secondTransaction) => firstTransaction
        .nominal - secondTransaction.nominal
    );
  }

  render() {
    return (
      <div className="transaction__container">
        <div className="col-md-12">
          {this._renderSortAndFilter()}
          <div className="card" id="transaction-list">
            {this._renderTransactionList(this._displayTransactions())}
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsContainer;
