import React from 'react';
import LoginForm from '../Component/LoginForm';
import AuthUserService from '../service/AuthService';
import './TransactionsContainer.css';
import Notification from '../Component/Notification/Notification';

const { login } = AuthUserService;

class LoginContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '', successMessage: '' };
  }

  _successHandler = (message) => (
    <Notification message={message} success />
  );

  _errorHandler = (message) => (
    <Notification message={message} success={false} />
  );

  _onLoginHandler = async (inputedData) => {
    const { onLoginSuccess } = this.props;
    this.setState({ successMessage: '', errorMessage: '' });
    try {
      await login(inputedData);
      this.setState({ successMessage: 'Login Successful! Redirecting...' });
      onLoginSuccess();
    } catch (error) {
      this.setState({ errorMessage: 'Username or Password is incorrect!' });
    }
  };

  render() {
    const { errorMessage, successMessage } = this.state;
    return (
      <>
        <LoginForm onLogin={this._onLoginHandler} />
        {errorMessage && this._errorHandler(errorMessage)}
        {successMessage && this._successHandler(successMessage)}
      </>
    );
  }
}

export default LoginContainer;
