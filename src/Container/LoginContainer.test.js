import { shallow } from 'enzyme';
import React from 'react';
import LoginContainer from './LoginContainer';
import AuthService from '../service/AuthService';

const { login } = AuthService;
jest.mock('../service/AuthService.js', () => ({
  login: jest.fn()
}));
describe('Login', () => {
  let mockOnLoginSuccess;
  beforeEach(() => {
    mockOnLoginSuccess = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should call the login function with the data', async () => {
      const wrapper = shallow(<LoginContainer onLoginSuccess={mockOnLoginSuccess} />);
      const inputedData = {
        email: 'a@a.a',
        password: '123123'
      };

      wrapper.find('LoginForm').simulate('login', inputedData);
      await flushPromises();


      expect(login).toHaveBeenCalledWith(inputedData);
    });

    it('should have notification props success equal to true when login successful', async () => {
      const wrapper = shallow(<LoginContainer onLoginSuccess={mockOnLoginSuccess} />);
      const inputtedData = {
        email: 'a@a.a',
        password: '123123'
      };

      wrapper.find('LoginForm').simulate('login', inputtedData);
      await flushPromises();

      expect(wrapper.find('Notification').props().success).toBeTruthy();
    });

    it('should have notification props success equal to false when login is not successful', async () => {
      const wrapper = shallow(<LoginContainer onLoginSuccess={mockOnLoginSuccess} />);
      const inputtedData = {
        email: 'a@a.a',
        password: '123123'
      };

      login.mockRejectedValueOnce(inputtedData);
      wrapper.find('LoginForm').simulate('login', inputtedData);
      await flushPromises();

      expect(wrapper.find('Notification').props().success).toBeFalsy();
    });
  });
});
