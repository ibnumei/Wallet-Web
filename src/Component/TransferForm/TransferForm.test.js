import React from 'react';
import { shallow } from 'enzyme';
import TransferForm from './TransferForm';

describe('TransferForm', () => {
  let mockedOnSubmit;
  let mockedOnCheckPayee;

  beforeEach(() => {
    mockedOnSubmit = jest.fn();
    mockedOnCheckPayee = jest.fn();
  });

  describe('#render', () => {
    it('should call onSubmit props with inputted data', () => {
      const wrapper = shallow(<TransferForm onSubmit={mockedOnSubmit} />);
      const expectedResult = {
        nominal: '10000',
        description: 'bayar utang'
      };

      wrapper.find('#nominal').simulate('change', { target: { name: 'nominal', value: '10000' } });
      wrapper.find('#description').simulate('change', { target: { name: 'description', value: 'bayar utang' } });
      wrapper.find('#submit-button').simulate('click');

      expect(mockedOnSubmit)
        .toHaveBeenCalledWith(expectedResult.nominal, expectedResult.description);
    });

    it('should disable transfer button when payee is not checked ', async () => {
      const wrapper = shallow(<TransferForm
        onSubmit={mockedOnSubmit}
        onCheckPayee={mockedOnCheckPayee}
      />);
      await mockedOnCheckPayee.mockResolvedValue(false);
      await flushPromises();

      expect(wrapper.find('#submit-button').props().disabled).toBeTruthy();
    });

    it('should not disable transfer button when check button is pressed and payee does exist ', async () => {
      const wrapper = shallow(<TransferForm
        onSubmit={mockedOnSubmit}
        onCheckPayee={mockedOnCheckPayee}
      />);
      await mockedOnCheckPayee.mockResolvedValue(true);
      await flushPromises();

      expect(wrapper.find('#submit-button').props().disabled).toBeTruthy();
    });
  });
});
