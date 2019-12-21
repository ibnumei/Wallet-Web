import React from 'react';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
import WalletService from '../service/WalletService';
import TransactionService from '../service/TransactionService';

const { getWalletByUserId } = WalletService;
const { getTransactionByUserId } = TransactionService;

jest
  .mock('../service/WalletService', () => ({
    getWalletByUserId: jest.fn()
  }))
  .mock('../service/TransactionService', () => ({
    getTransactionByUserId: jest.fn(),
    topUpWallet: jest.fn()
  }));

describe('DashboardContainer', () => {
  describe('#render', () => {
    let wallet;
    let user;
    let wrapper;
    let transaction;
    let transactions;
    let userResponse;
    let walletResponse;
    let transactionResponse;

    beforeEach(async () => {
      wallet = {
        id: 1,
        userId: 1,
        balance: 50000,
        createdAt: '2019-12-12T16:25:45.774Z',
        updatedAt: '2019-12-12T16:25:45.774Z'
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
      transaction = {
        id: 1,
        walletId: 1,
        nominal: 1000,
        type: 'withdraw',
        description: 'test',
        createdAt: '2019-12-01T00:03:03.432Z',
        updatedAt: '2019-12-01T00:03:03.432Z',
        beneficiaryData: {
          id: 1,
          name: 'Mitshuki Temannya Boruto'
        }
      };
      transactions = [transaction, transaction, transaction, transaction, transaction];

      userResponse = { data: { user } };
      walletResponse = { data: { wallet } };
      transactionResponse = { data: transactions };

      jest.spyOn(Storage.prototype, 'setItem');
      jest.spyOn(Storage.prototype, 'getItem');
      localStorage.getItem.mockResolvedValue(JSON.stringify(user));

      getWalletByUserId.mockResolvedValue(walletResponse);
      getTransactionByUserId.mockResolvedValue(transactionResponse);

      wrapper = shallow(<DashboardContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should parsing the users data from the server to component UserInfo', async () => {
      expect(wrapper.find('UserInfo').props().user).toEqual(userResponse.data.user);
    });

    it('should parsing the wallet data from the server to component WalletInfo', async () => {
      expect(wrapper.find('WalletInfo').props().wallet).toEqual(walletResponse.data);
    });

    it('should call getItem with key User', async () => {
      expect(localStorage.getItem).toHaveBeenCalledWith('User');
    });

    it('should render at maximum 5 transactions data', async () => {
      expect(wrapper.find('TransactionList').props().transactions.length).toBeLessThanOrEqual(5);
    });

    it('should handle open modal when top up button is clicked', () => {
      const topUpButton = wrapper.find('#top-up-button');
      topUpButton.simulate('click');

      const topUpModal = wrapper.find('#top-up-modal');
      expect(topUpModal.props().isOpen).toBeTruthy();
    });

    it('should handle close top up modal when close button is clicked', () => {
      const topUpButton = wrapper.find('#top-up-button');
      const closeTopUpButton = wrapper.find('#top-up-close-button');

      topUpButton.simulate('click');
      closeTopUpButton.simulate('click');

      const topUpModal = wrapper.find('#top-up-modal');
      expect(topUpModal.props().isOpen).toBeFalsy();
    });

    it('should handle close transfer modal when close button is clicked', () => {
      const transferButton = wrapper.find('#transfer-button');
      const closeTopUpButton = wrapper.find('#transfer-close-button');

      transferButton.simulate('click');
      closeTopUpButton.simulate('click');

      const transferModal = wrapper.find('#transfer-modal');
      expect(transferModal.props().isOpen).toBeFalsy();
    });
  });
});
