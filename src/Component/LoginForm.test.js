import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let onLogin;
  let wrapper;

  beforeEach(() => {
    onLogin = jest.fn();
    wrapper = shallow(<LoginForm onLogin={onLogin} />);
    wrapper.find('#email').simulate('change', {
      target: {
        name: 'email',
        value: 'Monang@gmail.com'
      }
    });
    wrapper.find('#password').simulate('change', {
      target: {
        name: 'password',
        value: '123456'
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should contain email and password', () => {
      const expectedEmail = 'Monang@gmail.com';
      const expectedPassword = '123456';

      expect(wrapper.find('#email').props().value).toBe(expectedEmail);
      expect(wrapper.find('#password').props().value).toBe(expectedPassword);
    });

    it('should call onClick function when the button clicked', () => {
      const expectedEmail = 'Monang@gmail.com';
      const expectedPassword = '123456';

      wrapper.find('button').simulate('click');

      expect(onLogin).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });
    });
  });
});
