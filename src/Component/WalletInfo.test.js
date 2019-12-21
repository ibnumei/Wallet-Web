import React from 'react';
import { shallow } from 'enzyme';
import WalletInfo from './WalletInfo';

describe('WalletInfo', () => {
  describe('#render', () => {
    let wallet;

    beforeEach(() => {
      wallet = {
        id: 1,
        userId: 1,
        balance: 50000,
        createdAt: '2019-12-12T16:25:45.774Z',
        updatedAt: '2019-12-12T16:25:45.774Z'
      };
    });

    it('should contain balance', () => {
      const wrapper = shallow(<WalletInfo wallet={wallet} />);

      const elementBalance = wrapper.find('#balance');

      expect(elementBalance.text()).toEqual('IDR50,000');
    });
  });
});
