import axios from 'axios';
import constant from '../Constant';

const { BASE_URL } = constant;

const getWalletByUserId = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/wallets`);
  return response;
};

export default {
  getWalletByUserId
};
