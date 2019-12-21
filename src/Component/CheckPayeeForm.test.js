import React from 'react';
import { shallow } from 'enzyme';
import CheckPayeeForm from './CheckPayeeForm';

describe('CheckPayeeForm', () => {
  describe('#render', () => {
    let payee;
    beforeEach(() => {
      payee = {
        id: 2,
        name: 'Mitshuki ',
        cashtag: 'mitshuki',
        address: 'suatu rumah di konoha',
        phoneNumber: '+1 123321123',
        email: 'mitshuki@konoha.com',
        createdAt: '2019-12-18T10:00:19.980Z',
        updatedAt: '2019-12-18T10:00:19.980Z'
      };
    });
    it('should has value of cashtag in input field when user input cashtag ', async () => {
      const expectedCashtag = 'mitshuki';
      const wrapper = shallow(<CheckPayeeForm payee={payee} />);

      expect(wrapper.find('#cashtag').props().value).toBe(expectedCashtag);
    });

    it('should called onChangeCashtag function props when cashtag input is changed', async () => {
      const onChangeCashtagMock = jest.fn();
      const wrapper = shallow(<CheckPayeeForm
        payee={payee}
        onChangeCashtag={onChangeCashtagMock}
      />);

      wrapper.find('#cashtag').simulate('change', {
        target: {
          name: 'cashtag',
          value: 'Addits'
        }
      });

      await flushPromises();

      expect(onChangeCashtagMock).toHaveBeenCalledTimes(1);
    });

    it('should called onCheck function when user click check button', async () => {
      const onCheckMock = jest.fn();
      const onChangeCashtagMock = jest.fn();
      const wrapper = shallow(<CheckPayeeForm
        payee={payee}
        onCheck={onCheckMock}
        onChangeCashtag={onChangeCashtagMock}
      />);

      wrapper.find('#cashtag').simulate('change', {
        target: {
          name: 'cashtag',
          value: 'Addits'
        }
      });
      wrapper.find('#checkPayee').simulate('click', 'Addits');
      await flushPromises();

      expect(onCheckMock).toHaveBeenCalledWith('Addits');
    });

    it('should call props "onSubmit" and sending data new inserted', () => {
      const onSubmitMock = jest.fn();
      const wrapper = shallow(<CheckPayeeForm
        payee={payee}
        onSubmit={onSubmitMock}
        disabledCard={false}
      />);
      wrapper.find('#submitForm').simulate('click');

      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmitTransfer function when user clicked Transfer button', () => {
      const nominal = '50000';
      const description = 'Testing description';
      const onSubmitMock = jest.fn();
      const onSubmitTransferMock = jest.fn();
      const wrapper = shallow(<CheckPayeeForm
        payee={payee}
        onSubmit={onSubmitMock}
        onSubmitTransfer={onSubmitTransferMock}
        disabledCard={false}
      />);

      wrapper.find('TransferForm').simulate('submit', nominal, description);

      expect(onSubmitTransferMock).toHaveBeenCalledWith(nominal, description);
    });
  });
});
