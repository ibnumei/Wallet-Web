import axios from 'axios';
import FavoritePayeeService from './FavoritePayeeService';

const { getFavoritePayees, addFavoritePayee } = FavoritePayeeService;

jest.mock('axios');

describe('FavoritePayeeService', () => {
  let favoritePayees;
  let response;
  let addFavoritePayees;

  beforeEach(() => {
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
    addFavoritePayees = {
      data: {
        id: 2,
        userId: 1,
        payeeId: 2,
        updatedAt: '2019-12-16T17:11:22.625Z',
        createdAt: '2019-12-16T17:11:22.625Z'
      }
    };
    response = { data: favoritePayees };
    axios.get.mockResolvedValue(response);
    axios.post.mockResolvedValue(addFavoritePayees);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#getFavoritePayeesByUserId', () => {
    it('should return list of favorite Payee based on user id', async () => {
      const { data } = await getFavoritePayees(favoritePayees.id);

      expect(data).toEqual(favoritePayees);
    });
  });

  describe('#addFavoritePayee', () => {
    it('should return new favorite payee', async () => {
      const { data } = await addFavoritePayee(favoritePayees.id, favoritePayees.payeeId);

      expect(data).toEqual(addFavoritePayees.data);
    });
  });
});
