import React from 'react';
import { shallow } from 'enzyme';
import ActionContainer from './ActionContainer';
import WalletService from '../service/WalletService';
import TransactionService from '../service/TransactionService';
import FavoritePayeeService from '../service/FavoritePayeeService';

const { getWalletByUserId } = WalletService;
const { transfer } = TransactionService;
const { getFavoritePayees, addFavoritePayee, getUserByCashtag } = FavoritePayeeService;


jest
  .mock('../service/WalletService', () => ({
    getWalletByUserId: jest.fn()
  }))
  .mock('../service/TransactionService', () => ({
    transfer: jest.fn()
  }))
  .mock('../service/FavoritePayeeService', () => ({
    getFavoritePayees: jest.fn(),
    addFavoritePayee: jest.fn(),
    getUserByCashtag: jest.fn()
  }));

describe('ActionContainer', () => {
  describe('#render', () => {
    let wrapper;
    let wallet;
    let user;
    let secondUser;
    let favoritePayees;
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

      secondUser = {
        id: 2,
        name: 'Ibnu mei',
        address: 'Bandung',
        phoneNumber: '19096834',
        email: 'ibnu@gmail.com',
        createdAt: '2019-12-12T16:21:19.936Z',
        updatedAt: '2019-12-12T16:21:19.936Z'
      };

      favoritePayees = [{
        id: 1,
        userId: 1,
        payeeId: 2,
        nickname: 'Mitskuy',
        createdAt: '2019-12-16T17:11:15.142Z',
        updatedAt: '2019-12-16T17:11:15.142Z',
        user: {
          id: 2,
          name: 'Mitshuki ',
          cashtag: 'mitshuki',
          address: 'suatu rumah di konoha',
          phoneNumber: '+1 123321123',
          email: 'mitshuki@konoha.com',
          profileImage: 'img/mitshuki.jpg',
          createdAt: '2019-12-16T17:06:44.407Z',
          updatedAt: '2019-12-16T17:06:44.407Z'
        }
      }];

      const walletResponse = {
        data: wallet
      };

      const favoritePayeeResponse = {
        data: favoritePayees
      };

      const secondUserResponse = {
        data: [secondUser]
      };

      jest.spyOn(Storage.prototype, 'getItem');
      localStorage.getItem.mockResolvedValue(JSON.stringify(user));
      getFavoritePayees.mockResolvedValue(favoritePayeeResponse);
      getWalletByUserId.mockResolvedValue(walletResponse);
      getUserByCashtag.mockResolvedValue(secondUserResponse);
      wrapper = shallow(<ActionContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render favorite payee list when page is load', () => {
      expect(wrapper.find('FavoritePayeeList').props().list).toEqual(favoritePayees);
    });


    it('should render card payee detail information when user check cashtag', async () => {
      const CheckPayeeForm = wrapper.find('CheckPayeeForm');

      CheckPayeeForm.simulate('check', favoritePayees[0].cashtag);
      await flushPromises();

      expect(wrapper.find('CheckPayeeForm').props().disabledCard).toBeFalsy();
    });

    it('should add payee to favorite payees list when user clicked add favorite button', async () => {
      const CheckPayeeForm = wrapper.find('CheckPayeeForm');

      CheckPayeeForm.simulate('check', favoritePayees[0].cashtag);
      await flushPromises();

      wrapper.find('CheckPayeeForm').simulate('submit');
      await flushPromises();

      expect(addFavoritePayee).toHaveBeenCalledWith(user.id, secondUser.id);
    });

    it('should has called transfer function when user clicked transfer button', async () => {
      const CheckPayeeForm = wrapper.find('CheckPayeeForm');

      CheckPayeeForm.simulate('check', favoritePayees[0].cashtag);
      await flushPromises();

      wrapper.find('CheckPayeeForm').simulate('submitTransfer', '80000', 'Testing');
      await flushPromises();

      expect(transfer).toHaveBeenCalledWith(user.id, wallet.id, secondUser.id, '80000', 'Testing');
    });
  });
});
