import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthService from './AuthService';
import StorageService from './StorageService';

const { login } = AuthService;
const { saveToken, saveUserData } = StorageService;

jest.mock('jwt-decode');
jest.mock('axios')
  .mock('./StorageService', () => ({
    saveToken: jest.fn(),
    saveUserData: jest.fn()
  }));

describe('AuthService', () => {
  let dataUser;
  let token;
  let decoded;
  beforeEach(() => {
    dataUser = {
      email: 'a@a.a',
      password: '123'
    };
    token = 'asdf';
    const response = {
      data: {
        token
      }
    };
    decoded = {
      user: {
        id: 1,
        name: 'Mitshuki Temannya Boruto',
        email: 'mitshuki@konoha.com',
        phoneNumber: '+1 123321123',
        address: 'suatu rumah di konoha',
        profileImage: 'img/mitshuki.jpg'
      },
      iat: 1576568817,
      exp: 1576741617
    };
    axios.post.mockResolvedValue(response);
    jwtDecode.mockReturnValue(decoded);
    saveToken.mockResolvedValue();
    saveUserData.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call a axios.post function with the dataUser', async () => {
      await login(dataUser);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', dataUser);
    });

    it('should call jwtDecode with token from response data', async () => {
      await login(dataUser);

      expect(jwtDecode).toHaveBeenCalledWith(token);
    });

    it('should call saveToken with the response token', async () => {
      await login(dataUser);
      const { user } = decoded;

      expect(saveToken).toHaveBeenCalledWith(token);
      expect(saveUserData).toHaveBeenCalledWith(user);
    });
  });
});
