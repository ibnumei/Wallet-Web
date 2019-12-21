import React from 'react';
import { shallow } from 'enzyme';
import numeral from 'numeral';
import moment from 'moment';
import TransactionList from './TransactionList';

describe('TransactionList', () => {
  let firstTransaction;
  let secondTransaction;
  let transactions;
  let wrapper;

  beforeEach(() => {
    firstTransaction = {
      id: 1,
      walletId: 1,
      nominal: 1000,
      type: 'withdraw',
      description: 'test',
      createdAt: '2019-12-03T00:03:03.432Z',
      updatedAt: '2019-12-03T00:03:03.432Z',
      beneficiaryData: {
        id: 1,
        name: 'Mitshuki Temannya Boruto',
        cashtag: 'mitshuki'

      }
    };

    secondTransaction = {
      id: 2,
      walletId: 1,
      nominal: 100,
      type: 'deposit',
      description: 'euy',
      createdAt: '2019-12-01T00:10:18.917Z',
      updatedAt: '2019-12-01T00:10:18.917Z'
    };

    transactions = [firstTransaction, secondTransaction];
    wrapper = shallow(<TransactionList transactions={transactions} />);
  });

  describe('#render', () => {
    it('should render all transactions', () => {
      const tableElement = wrapper.find('tbody');
      const rowElement = tableElement.find('tr');
      const cells = rowElement.first().find('td');

      expect(cells.at(0).text()).toEqual(moment(firstTransaction.createdAt)
        .format(TransactionList.FORMATS.date));
      expect(cells.at(1).text()).toEqual(firstTransaction.type);
      expect(cells.at(2).text()).toEqual(`IDR ${numeral(firstTransaction.nominal)
        .format(TransactionList.FORMATS.currency)}`);
      expect(cells.at(3).text()).toEqual(firstTransaction.description);
      expect(cells.at(4).text()).toEqual(`${firstTransaction.beneficiaryData.name} ($${firstTransaction.beneficiaryData.cashtag})`);
    });

    it('should have length of transactions', () => {
      const tableElement = wrapper.find('tbody');
      const rowElement = tableElement.find('tr');

      expect(rowElement).toHaveLength(2);
    });
  });
});
