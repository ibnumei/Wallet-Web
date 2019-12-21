import axios from 'axios';
import constant from '../Constant';

const { BASE_URL } = constant;

const getTransactionByUserId = async (userId, limit, walletId) => {
  const transactionPath = `${BASE_URL}/users/${userId}/wallets/${walletId}/transactions`;
  if (limit) {
    return axios.get(`${transactionPath}?limit=${limit}`);
  }
  const response = await axios.get(transactionPath);
  return response;
};

const topUpWallet = async (userId, nominal, walletId) => {
  const topUpPath = `${BASE_URL}/users/${userId}/wallets/${walletId}/transactions`;
  const response = await axios.post(topUpPath,
    {
      type: 'deposit',
      description: 'top up wallet balance',
      nominal
    });
  return response;
};


const transfer = async (
  id,
  idWallet,
  payeeId,
  nominal,
  transferDescription
) => {
  const transferPath = `${BASE_URL}/users/${id}/wallets/${idWallet}/transactions`;
  const response = await axios.post(transferPath, {
    type: 'withdraw',
    description: transferDescription,
    nominal,
    beneficiaryId: payeeId
  });
  return response;
};

export default {
  topUpWallet,
  getTransactionByUserId,
  transfer
};
