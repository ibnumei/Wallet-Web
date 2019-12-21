import axios from 'axios';
/**
 * Represent service for favorite payee
 */

import constants from '../Constant';

const { BASE_URL } = constants;

const getFavoritePayees = (id) => {
  const favoritePayeePath = `${BASE_URL}/users/${id}/favorite-payees`;
  return axios.get(favoritePayeePath);
};

const addFavoritePayee = (id, payeeId) => {
  const favoritePayeePath = `${BASE_URL}/users/${id}/favorite-payees`;
  return axios.post(favoritePayeePath, {
    id,
    payeeId
  });
};

const getUserByCashtag = (cashtag) => {
  const favoritePayeePath = `${BASE_URL}/users?cashtag=${cashtag}`;
  return axios.get(favoritePayeePath);
};

export default {
  getFavoritePayees,
  addFavoritePayee,
  getUserByCashtag
};
