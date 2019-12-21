import React from 'react';
import PropTypes from 'prop-types';
import './UserInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faPhone, faMailBulk, faDollarSign
} from '@fortawesome/free-solid-svg-icons';

/**
 * Represent info of the user
 */
class UserInfo extends React.PureComponent {
  _renderCashtagAndUserName = () => {
    const { user } = this.props;
    return (
      <>
        <div className="row">
          <i><FontAwesomeIcon icon={faDollarSign} /></i>
          <span id="userCashtag">{` ${user.cashtag}`}</span>
        </div>
        <div className="row">
          <i><FontAwesomeIcon icon={faUser} /></i>
          <span id="userName">{user.name}</span>
        </div>
      </>
    );
  };

  _renderPhoneNumberAndEmail = () => {
    const { user } = this.props;
    return (
      <>
        <div className="row">
          <i><FontAwesomeIcon icon={faPhone} /></i>
          <span id="userPhone">{user.phoneNumber}</span>
        </div>
        <div className="row">
          <i><FontAwesomeIcon icon={faMailBulk} /></i>
          <span id="userEmail">{user.email}</span>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="card bordered col-md-7 dashboard-info__user">
        <div className="card-header">
          <span className="card-title">
            My Profile
          </span>
        </div>
        <div className="card-content">
          {this._renderCashtagAndUserName()}
          {this._renderPhoneNumberAndEmail()}
        </div>
      </div>
    );
  }
}

UserInfo.defaultProps = {
  user: {}
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    profileImage: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })
};

export default UserInfo;
