import React from 'react';
import './TransferForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

class TransferForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this._initState();
  }

  _initState = () => {
    this.state = {
      nominal: '',
      description: ''
    };
  };

  _handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  _handleSubmit = () => {
    const { nominal, description } = this.state;
    const { onSubmit } = this.props;
    onSubmit(nominal, description);
  };

  _renderSubmitButton = () => {
    const { nominal } = this.state;
    const isInputted = (nominal !== '');
    const className = isInputted ? 'btn btn-info btn-border pull-right' : 'btn btn-info pull-right';
    return (
      <button className={className} disabled={!isInputted} id="submit-button" type="button" onClick={this._handleSubmit}>
        <i>
          <FontAwesomeIcon icon={faPaperPlane} />
          {' Transfer'}
        </i>
      </button>
    );
  }

  _renderFormBody = () => {
    const { nominal, description } = this.state;
    return (
      <div>
        <div className="row">
          <div className="row">
            <input className="form-control" value={nominal} type="number" min="10000" max="10000000" id="nominal" name="nominal" placeholder="nominal" onChange={this._handleChange} />
          </div>
          <input className="form-control" value={description} id="description" name="description" placeholder="description (optional)" onChange={this._handleChange} />
        </div>
        <div className="row">
          {this._renderSubmitButton()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="transfer-form-container">
        <div className="card-header">
          <div className="card-title recent-transactions__title">Transfer</div>
        </div>
        {this._renderFormBody()}
      </div>
    );
  }
}

export default TransferForm;
