import React from 'react';
import {
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import DashboardContainer from './Container/DashboardContainer';
import TransactionsContainer from './Container/TransactionsContainer';
import ActionContainer from './Container/ActionContainer';
import LoginContainer from './Container/LoginContainer';
import StorageService from './service/StorageService';

const { getToken, getUser, logout } = StorageService;

const applyAxiosConfig = async () => {
  axios.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      const newConfig = {
        ...config,
        headers: { Authorization: token }
      };
      return newConfig;
    },
    (error) => Promise.reject(error)
  );
};

applyAxiosConfig();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  async componentDidMount() {
    const localUserData = await getUser();
    const storageUser = JSON.parse(localUserData);
    if (storageUser) {
      this.setState({ isLoggedIn: true });
    }
  }

  _renderDashboardMenu = () => (
    <NavLink to="/">
      <i className="md md-home sidebar-menu__icon" />
      <span className="sidebar-menu__text">Dashboard</span>
    </NavLink>
  )

   _renderTransactionsMenu= () => (
     <NavLink to="/transactions">
       <i className="md md-swap-horiz sidebar-menu__icon" />
       <span className="sidebar-menu__text">Transactions</span>
     </NavLink>
   );

  _renderActionMenu = () => (
    <NavLink to="/actions">
      <i className="md md-wallet-membership sidebar-menu__icon" />
      <span className="sidebar-menu__text">Action</span>
    </NavLink>
  )

  _renderLogoutMenu= () => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" onClick={this._handleLogout}>
      <i className="md md-exit-to-app sidebar-menu__icon" />
      <span className="sidebar-menu__text">Log out</span>
    </a>
  );

  _handleLogout = async () => {
    await logout();
    this.setState({ isLoggedIn: false });
  };

   _renderNavLinks = () => (
     <>
       <li>
         {this._renderDashboardMenu()}
       </li>
       <li>
         {this._renderTransactionsMenu()}
       </li>
       <li>
         {this._renderActionMenu()}
       </li>
       <li>
         {this._renderLogoutMenu()}
       </li>
     </>
   );

  _renderAsideMenu= () => (
    <aside className="sidebar fixed">
      <div className="brand-logo">
        <h2>Yo.By</h2>
      </div>
      <ul className="menu-links">
        {this._renderNavLinks()}
      </ul>
      <div className="sidebar-button"><span className="sidebar-button__text">My Wallet</span></div>
    </aside>
  );


   _renderSwitchRoute= () => (
     <div className="row no-gutter">
       <Switch>
         <Route exact path="/">
           <DashboardContainer />
         </Route>
         <Route exact path="/transactions">
           <TransactionsContainer />
         </Route>
         <Route exact path="/actions">
           <ActionContainer />
         </Route>
       </Switch>
     </div>
   );

   _renderFooter= () => (
     <div className="card-footer">
       <img className="card-footer__image" src="https://docs.google.com/uc?id=1MAKgz1I1xGwLRdEoMRQwCHgfdHivsgbk" alt="loading.." />
     </div>
   );

  _renderDashboard = () => (
    <div className="theme-template-dark alert-open alert-with-mat-grow-top-right">
      {this._renderAsideMenu()}
      <div className="main-container">
        <div className="main-content">
          {this._renderSwitchRoute()}
        </div>
        {this._renderFooter()}
      </div>
    </div>
  );

  _renderLogin = () => (
    <div className="login-container">
      <LoginContainer onLoginSuccess={this._loginHandler} />
    </div>
  );

  _loginHandler = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <>
        {isLoggedIn && this._renderDashboard()}
        {!isLoggedIn && this._renderLogin()}
      </>
    );
  }
}

export default App;
