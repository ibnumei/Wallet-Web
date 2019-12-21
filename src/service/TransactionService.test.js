import axios from 'axios';
import TransactionService from './TransactionService';

const { getTransactionByUserId, topUpWallet } = TransactionService;

jest.mock('axios');

describe('TransactionService', () => {
  let transaction;
  let response;
  let topUpResponse;

  beforeEach(() => {
    transaction = [{
      id: 1,
      walletId: 1,
      nominal: 1000,
      balance: 1000,
      type: 'deposit',
      description: 'test',
      createdAt: '2019-12-01T00:03:03.432Z',
      updatedAt: '2019-12-01T00:03:03.432Z',
      beneficiaryData: {
        id: 1,
        cashtag: 'mitshuki',
        name: 'Mitshuki Temannya Boruto'
      }
    }];
    topUpResponse = {
      id: 6,
      walletId: 1,
      nominal: 100000,
      type: 'deposit',
      description: 'top up wallet balance',
      beneficiaryId: null,
      updatedAt: '2019-12-16T07:28:55.412Z',
      createdAt: '2019-12-16T07:28:55.412Z'
    };

    const user = {
      id: 1,
      name: 'Adit A A',
      address: 'Jakarta',
      phoneNumber: '09871221090',
      email: 'adit@gmail.com',
      profileImage: 'profil image',
      createdAt: '2019-12-12T16:21:19.936Z',
      updatedAt: '2019-12-12T16:21:19.936Z'
    };
    response = { data: transaction };
    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(topUpResponse);
  });

  describe('#getTransactionByUserId', () => {
    it('should return list of transaction based on user id', async () => {
      const result = await getTransactionByUserId(1, null, 1);

      expect(result).toEqual(response);
    });

    it('should return zero list of transaction based on user id when the limit is 0', async () => {
      axios.get.mockResolvedValue({});

      const result = await getTransactionByUserId(1, null, 1);

      expect(result).toEqual({});
    });

    it('should return two list of transaction based on user id when the limit is 2', async () => {
      const result = await getTransactionByUserId(1, 2, 1);

      expect(result).toEqual(response);
    });
  });

  describe('#topUpWallet', () => {
    it('should return new deposit transaction', async () => {
      const result = await topUpWallet(1, 100000,1);

      expect(result).toEqual(topUpResponse);
    });

    it('should call axios post with new deposit transaction', async () => {
      const resultBody = {
        type: 'deposit',
        nominal: 100000,
        description: 'top up wallet balance'
      };

      await topUpWallet(1, 100000, 1);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users/1/wallets/1/transactions', resultBody);
    });
  });
});
