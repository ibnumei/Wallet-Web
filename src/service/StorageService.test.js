import StorageService from './StorageService';

const { saveToken, saveUserData, logout } = StorageService;

describe('StorageService', () => {
  let dataUser;
  let token;
  beforeEach(() => {
    dataUser = {
      email: 'a@a.a',
      password: '123'
    };
    token = 'asdf';
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('StorageService', () => {
    it('should call a axios.post function with the dataUser', async () => {
      await saveToken(token);

      expect(localStorage.setItem).toHaveBeenCalledWith('Token', token);
    });

    it('should call saveToken with the response token', async () => {
      await saveUserData(dataUser);

      expect(localStorage.setItem).toHaveBeenCalledWith('User', JSON.stringify(dataUser));
    });

    it('should remove User and Token from localStorage item', async () => {
      await saveToken(token);
      await saveUserData(dataUser);
      await logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('User');
      expect(localStorage.removeItem).toHaveBeenCalledWith('Token');
    });
  });
});
