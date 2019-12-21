import axios from 'axios';
import jwtDecode from 'jwt-decode';
import StorageService from './StorageService';

import constant from '../Constant';

const { BASE_URL } = constant;

const { saveToken, saveUserData } = StorageService;

const login = async (data) => {
  const { data: responseData } = await axios.post(`${BASE_URL}/login`, data);
  const { token } = responseData;
  await saveToken(token);
  const { user } = jwtDecode(token);
  await saveUserData(user);
  return responseData;
};

export default {
  login
};
