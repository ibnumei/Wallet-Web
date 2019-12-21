import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  _handleChange = (event) => {
    const key = event.target.name;
    const { value } = event.target;
    this.setState({ [key]: value });
  };

  _handleLogin = () => {
    const { onLogin } = this.props;
    const { email, password } = this.state;
    const loginCredential = {
      email,
      password
    };
    this.setState({
      email: '',
      password: ''
    });
    onLogin(loginCredential);
  };

  _renderInput = (email, password) => (
    <>
      <input
        className="form-control"
        placeholder="Email. . ."
        id="email"
        name="email"
        onChange={this._handleChange}
        value={email}
      />
      <input
        className="form-control"
        placeholder="Password. . ."
        id="password"
        type="password"
        name="password"
        onChange={this._handleChange}
        value={password}
      />
    </>
  )

  _renderForm = () => {
    const { email, password } = this.state;
    return (
      <>
        {this._renderInput(email, password)}
        <button id="login-button" className="btn btn-warning" type="submit" onClick={this._handleLogin}>
          Login
        </button>
      </>
    );
  }

  render() {
    return (
      <>
        <h2 className="text-warning bold">Welcome Back!</h2>
        <p>Please login to continue</p>
        <div className="login-box">
          {this._renderForm()}
        </div>
      </>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};
