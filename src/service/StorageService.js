const saveToken = async (token) => {
  await localStorage.setItem('Token', token);
};

const saveUserData = async (data) => {
  await localStorage.setItem('User', JSON.stringify(data));
};

const getToken = async () => localStorage.getItem('Token');

const getUser = async () => localStorage.getItem('User');

const logout = async () => {
  await localStorage.removeItem('User');
  await localStorage.removeItem('Token');
};

export default {
  saveToken,
  saveUserData,
  getToken,
  getUser,
  logout
};
