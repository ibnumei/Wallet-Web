import axios from 'axios';
import WalletService from './WalletService';

const { getWalletByUserId } = WalletService;

jest.mock('axios');

describe('WalletService', () => {
  describe('#getWalletById', () => {
    let wallet;
    let response;
    beforeEach(() => {
      wallet = {
        id: 1,
        userId: 1,
        balance: 50000,
        createdAt: '2019-12-12T16:25:45.774Z',
        updatedAt: '2019-12-12T16:25:45.774Z'
      };
      response = { data: wallet };
      axios.get.mockResolvedValue(response);
    });
    it('should return wallet data', async () => {
      const { data } = await getWalletByUserId(wallet.userId);

      expect(data).toEqual(wallet);
    });
  });
});
