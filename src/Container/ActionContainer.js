import React from 'react';
import Notification from '../Component/Notification/Notification';
import FavoritePayeeService from '../service/FavoritePayeeService';
import WalletService from '../service/WalletService';
import constant from '../Constant';
import TransactionService from '../service/TransactionService';
import FavoritePayeeList from '../Component/FavoritePayeeList';
import CheckPayeeForm from '../Component/CheckPayeeForm';

const { getFavoritePayees, addFavoritePayee, getUserByCashtag } = FavoritePayeeService;
const { getWalletByUserId } = WalletService;
const { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT } = constant;
const { transfer } = TransactionService;


class ActionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritePayeeList: [],
      successMessage: '',
      errorMessage: '',
      wallet: {},
      user: {},
      payee: {},
      isDisabled: true
    };
  }

  async componentDidMount() {
    const localUserData = await localStorage.getItem('User');
    const storageUser = JSON.parse(localUserData);
    await this.setState({
      user: storageUser
    });
    await this._fetchWallet();
    await this._getListFavoritPayees();
  }

  _getListFavoritPayees = async () => {
    const { user } = this.state;
    const { data } = await getFavoritePayees(user.id);
    this.setState({
      favoritePayeeList: data
    });
  };

  _renderNotification = (message, isSuccess) => (
    <Notification message={message} success={isSuccess} />
  );

  _onSubmitHandler = async () => {
    this.setState({ successMessage: '', errorMessage: '' });
    const { user, payee } = this.state;
    try {
      await addFavoritePayee(
        user.id, payee.id
      );
      await this._getListFavoritPayees();
      this.setState({ successMessage: 'Your favorite payee is added' });
    } catch (e) {
      this.setState({ errorMessage: 'Payee already favorited' });
    }
  };

  _onSubmitTransfer = (amount, description) => {
    this.setState({ successMessage: '', errorMessage: '' });
    const isBelowMinimumTransaction = parseInt(amount, 10) < MIN_TRANSACTION_AMOUNT;
    const isAboveMaximumTransaction = parseInt(amount, 10) > MAX_TRANSACTION_AMOUNT;
    if (isBelowMinimumTransaction || isAboveMaximumTransaction) {
      return this.setState({
        errorMessage: 'Transfer amount must be between IDR 10,000 - IDR 10,000,000'
      });
    }
    return this._transferAmount(amount, description);
  };

  _transferAmount = async (amount, description) => {
    this.setState({ errorMessage: '', successMessage: '' });
    const { user, payee, wallet } = this.state;
    try {
      await transfer(user.id, wallet.id, payee.id, amount, description);
      this.setState({ successMessage: 'Transfer successful' });
    } catch (error) {
      this.setState({ errorMessage: 'Transfer failed' });
    }
  };

  _onCheckCashtag = async (cashtag) => {
    this.setState({ errorMessage: '' });
    try {
      const { data } = await getUserByCashtag(cashtag);
      this._checkCashtagSelf(data);
    } catch (error) {
      this.setState({ errorMessage: 'User is not found' });
    }
  };

  _checkCashtagSelf = (data) => {
    const { user } = this.state;
    if (data[0].id !== user.id) {
      this.setState({
        payee: data[0],
        isDisabled: false
      });
    }
  };

  _onChangeCashtag = () => {
    this.setState({
      payee: {},
      isDisabled: true
    });
  };

  _onSelectedCashtag = (payee) => {
    this.setState({
      payee: payee.user,
      isDisabled: false
    });
  };

  async _fetchWallet() {
    const { user } = this.state;
    const { data: wallet } = await getWalletByUserId(user.id);
    this.setState({
      wallet
    });
  }

  render() {
    const {
      successMessage, errorMessage, favoritePayeeList, isDisabled, payee
    } = this.state;
    return (
      <>
        {successMessage && this._renderNotification(successMessage, true)}
        {errorMessage && this._renderNotification(errorMessage, false)}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title recent-transactions__title">Transfer Form</div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FavoritePayeeList
                  list={favoritePayeeList}
                  onSelect={this._onSelectedCashtag}
                />
              </div>
              <div className="col-md-6">
                <CheckPayeeForm
                  onSubmit={this._onSubmitHandler}
                  onCheck={this._onCheckCashtag}
                  disabledCard={isDisabled}
                  onChangeCashtag={this._onChangeCashtag}
                  payee={payee}
                  onSubmitTransfer={this._onSubmitTransfer}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ActionContainer;
