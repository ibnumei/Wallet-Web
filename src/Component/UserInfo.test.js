import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  describe('#render', () => {
    let user;

    beforeEach(() => {
      user = {
        id: 1,
        name: 'Adit A A',
        address: 'Jakarta',
        cashtag: 'aditts',
        phoneNumber: '09871221090',
        email: 'adit@gmail.com',
        profileImage: 'profil image',
        createdAt: '2019-12-12T16:21:19.936Z',
        updatedAt: '2019-12-12T16:21:19.936Z'
      };
    });

    it('should contain name, phone number and email', () => {
      const wrapper = shallow(<UserInfo user={user} />);

      const elementCashtag = wrapper.find('#userCashtag');
      const elementName = wrapper.find('#userName');
      const elementPhone = wrapper.find('#userPhone');
      const elementEmail = wrapper.find('#userEmail');

      expect(elementCashtag.text()).toEqual(' aditts');
      expect(elementName.text()).toEqual('Adit A A');
      expect(elementPhone.text()).toEqual('09871221090');
      expect(elementEmail.text()).toEqual('adit@gmail.com');
    });
  });
});
