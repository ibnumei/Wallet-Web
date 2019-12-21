import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faPhone, faMailBulk, faDollarSign, faHeart
} from '@fortawesome/free-solid-svg-icons';
import './CheckPayeeForm.css';
import TransferForm from './TransferForm/TransferForm';

/**
 * Represent a form to add Favorite Payee
 */

class CheckPayeeForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cashtag: ''
    };
  }

  _handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === 'cashtag') {
      const { onChangeCashtag } = this.props;
      onChangeCashtag();
    }
    await this.setState({ [name]: value });
  };

  _handleSubmit = () => {
    const { onSubmit } = this.props;
    this.setState({
      cashtag: ''
    });
    onSubmit();
  };

  _handleSubmitTransfer = (nominal, description) => {
    const { onSubmitTransfer } = this.props;
    onSubmitTransfer(nominal, description);
  }


  _handleCheck = () => {
    const { cashtag } = this.state;
    const { onCheck } = this.props;
    onCheck(cashtag);
  };

  _renderButtonAddFavorite = () => (
    <button
      id="submitForm"
      className="btn btn-warning btn-border payee-button pull-right"
      type="submit"
      onClick={this._handleSubmit}
    >
      <i>
        <FontAwesomeIcon icon={faHeart} />
        {' Favorite'}
      </i>
    </button>
  );

  _renderCardContent = (payee) => (
    <>
      <div className="row">
        <i><FontAwesomeIcon icon={faUser} /></i>
        <span>{payee.name}</span>
      </div>
      <div className="row">
        <i><FontAwesomeIcon icon={faPhone} /></i>
        <span>{payee.phoneNumber}</span>
      </div>
      <div className="row">
        <i><FontAwesomeIcon icon={faMailBulk} /></i>
        <span>{payee.email}</span>
      </div>
      <TransferForm onSubmit={this._handleSubmitTransfer} />
    </>
  );

  _renderInfoPayee = () => {
    const { payee } = this.props;
    return (
      <div className="col-md-12">
        <div className="card bordered">
          <div className="card-header">
            <i><FontAwesomeIcon icon={faDollarSign} /></i>
            <span className="card-title">{payee.cashtag}</span>
            {this._renderButtonAddFavorite()}
          </div>
          <div className="card-content">
            {this._renderCardContent(payee)}
          </div>
        </div>
      </div>
    );
  };

  _renderInputCashtag = () => {
    const { cashtag } = this.state;
    const { payee } = this.props;
    return (
      <div className="payee">
        <label id="dollar-sign">$</label>
        <input
          className="form-control"
          id="cashtag"
          type="text"
          name="cashtag"
          onChange={this._handleChange}
          value={!payee ? cashtag : payee.cashtag}
        />
      </div>
    );
  };

  _renderForm = () => (
    <div className="row">
      <div className="col-md-9">
        <label htmlFor="cashtag">
            Cashtag
        </label>
        {this._renderInputCashtag()}
      </div>
      <div className="col-md-3">
        <button id="checkPayee" className="btn btn-info btn-border check-button" type="submit" onClick={this._handleCheck}>
            Check
        </button>
      </div>
    </div>
  );

  _renderFindCashtag = () => {
    const { disabledCard } = this.props;
    return (
      <div className="form-group">
        {this._renderForm()}
        <div id="payeeCard" className="payee-card" hidden={disabledCard}>
          {this._renderInfoPayee()}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="table-responsive white">
          <h3 className="table-title p-20 title-form-payee">Search Payee</h3>
        </div>
        <div className="form-floating">
          {this._renderFindCashtag()}
        </div>
      </div>
    );
  }
}

CheckPayeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CheckPayeeForm;
