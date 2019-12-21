import React from 'react';
import './FavoritePayeeList.css';
/**
 * Represent list of Favorite Payee
 */

class FavoritePayeeList extends React.PureComponent {
  _renderButtonTransferTo = (payee) => {
    const { onSelect } = this.props;
    return (
      <td>
        <button
          type="button"
          className="btn btn-warning btn-border"
          onClick={() => onSelect(payee)}
        >
          transfer to
        </button>
      </td>
    );
  };

  _renderTableBody = () => {
    const { list } = this.props;
    return (
      <tbody className="transaction-list__tableBody">
        {list.map((payee) => (
          <tr key={payee.id}>
            <td>{payee.user.name}</td>
            <td>{payee.user.cashtag}</td>
            {this._renderButtonTransferTo(payee)}
          </tr>
        ))}
      </tbody>
    );
  };

  _renderTableHead = () => (
    <thead>
      <tr>
        <th>Name</th>
        <th>Cashtag</th>
        <th />
      </tr>
    </thead>
  );

  render() {
    return (
      <>
        <div className="table-responsive white">
          <h3 className="table-title p-20">Favorite Payees</h3>
        </div>
        <div className="table-payee">
          <table className="table table-full table-full-small">
            {this._renderTableHead()}
            {this._renderTableBody()}
          </table>
        </div>
      </>
    );
  }
}

// FavoritePayeeList.propTypes = {
//   list: PropTypes.arrayOf(PropTypes.exact({
//     id: PropTypes.number,
//     userId: PropTypes.number,
//     payeeId: PropTypes.number,
//     nickname: PropTypes.string,
//     createdAt: PropTypes.string,
//     updatedAt: PropTypes.string
//   })).isRequired
// };

export default FavoritePayeeList;
