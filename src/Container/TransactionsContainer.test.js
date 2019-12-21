import React from 'react';
import { shallow } from 'enzyme';
import TransactionsContainer from './TransactionsContainer';
import TransactionService from '../service/TransactionService';
import WalletService from '../service/WalletService';

const { getWalletByUserId } = WalletService;
const { getTransactionByUserId } = TransactionService;

jest
  .mock('../service/WalletService', () => ({
    getWalletByUserId: jest.fn()
  }))
  .mock('../service/TransactionService', () => ({
    getTransactionByUserId: jest.fn()
  }));

describe('TransactionsContainer', () => {
  describe('#render', () => {
    let firstTransaction;
    let secondTransaction;
    let transactions;
    let wrapper;
    let wallet;
    let user;

    beforeEach(async () => {
      firstTransaction = {
        id: 1,
        walletId: 1,
        nominal: 20000,
        type: 'withdraw',
        description: 'test',
        createdAt: '2019-12-03T00:03:03.432Z',
        updatedAt: '2019-12-03T00:03:03.432Z',
        beneficiaryData: {
          id: 1,
          name: 'Mitshuki Temannya Boruto'
        }
      };
      user = {
        id: 1,
        name: 'Adit A A',
        address: 'Jakarta',
        phoneNumber: '09871221090',
        email: 'adit@gmail.com',
        createdAt: '2019-12-12T16:21:19.936Z',
        updatedAt: '2019-12-12T16:21:19.936Z'
      };

      secondTransaction = {
        id: 2,
        walletId: 1,
        nominal: 50000,
        type: 'deposit',
        description: 'euy',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z',
        beneficiaryData: {}
      };
      wallet = {
        id: 1,
        userId: 1,
        balance: 50000,
        createdAt: '2019-12-12T16:25:45.774Z',
        updatedAt: '2019-12-12T16:25:45.774Z'
      };

      transactions = [firstTransaction, secondTransaction];

      const response = {
        data: transactions
      };
      const walletResponse = {
        data: wallet
      };

      jest.spyOn(Storage.prototype, 'getItem');
      localStorage.getItem.mockResolvedValue(JSON.stringify(user));
      getWalletByUserId.mockResolvedValue(walletResponse);
      getTransactionByUserId.mockResolvedValue(response);
      wrapper = shallow(<TransactionsContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should get all of the transactions list from backend service', () => {
      expect(wrapper.find('TransactionList').props().transactions).toEqual(transactions);
    });

    it('should list filtered TransactionList by description', async () => {
      const filterElement = wrapper.find('TransactionFilterDescription');
      const inputText = 'euy';

      filterElement.simulate('filter', inputText);
      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toHaveLength(1);
    });

    it('should render the second transaction when simulate filter by description', async () => {
      const filterElement = wrapper.find('TransactionFilterDescription');
      const inputText = 'euy';

      filterElement.simulate('filter', inputText);
      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toEqual([secondTransaction]);
    });

    it('should render TransactionSorting dropdown element', () => {
      const sortElement = wrapper.find('TransactionSorting');

      expect(sortElement).toHaveLength(1);
    });


    it('should sort Transaction by oldest date by clicking apply button', async () => {
      const sortElement = wrapper.find('TransactionSorting');
      const sortValue = 'oldest-date';

      sortElement.simulate('sortDate', sortValue);
      wrapper.find('#filter-sort-button').simulate('click');
      await flushPromises();

      expect(wrapper.find('TransactionList').props().transactions).toEqual([secondTransaction, firstTransaction]);
    });

    it('should sort Transaction by newest date by clicking apply button', async () => {
      const sortElement = wrapper.find('TransactionSorting');
      const sortValue = 'newest-date';

      sortElement.simulate('sortDate', sortValue);
      wrapper.find('#filter-sort-button').simulate('click');
      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toEqual([firstTransaction, secondTransaction]);
    });

    it('should sort Transaction by lowest amount', async () => {
      const sortElement = wrapper.find('TransactionSorting');
      const sortValue = 'lowest-amount';

      sortElement.simulate('sortAmount', sortValue);
      wrapper.find('#filter-sort-button').simulate('click');
      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toEqual([firstTransaction, secondTransaction]);
    });

    it('should sort Transaction by highest amount when user click apply button', async () => {
      const sortElement = wrapper.find('TransactionSorting');
      const sortValue = 'highest-amount';

      sortElement.simulate('sortAmount', sortValue);
      wrapper.find('#filter-sort-button').simulate('click');
      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toEqual([secondTransaction, firstTransaction]);
    });

    it('should sort Transaction by lowest amount when user click apply button', async () => {
      const sortElement = wrapper.find('TransactionSorting');
      const sortValue = 'lowest-amount';

      sortElement.simulate('sortAmount', sortValue);
      wrapper.find('#filter-sort-button').simulate('click');
      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toEqual([firstTransaction, secondTransaction]);
    });

    it('should filter by transaction amount when amount range is inputted and apply button is clicked', async () => {
      const filterAmountElement = wrapper.find('TransactionFilterAmount');
      filterAmountElement.simulate('amountFilter', ['10000', '30000']);
      wrapper.find('#filter-sort-button').simulate('click');

      await flushPromises();
      const listElement = wrapper.find('TransactionList');

      expect(listElement.props().transactions).toEqual([transactions[0]]);
    });
  });
});
