import React from 'react';
import { shallow } from 'enzyme';
import TopUp from './TopUp';

describe('TopUp', () => {
  describe('#render', () => {
    let mockedOnSubmit;
    let wrapper;

    beforeEach(() => {
      mockedOnSubmit = jest.fn();
      wrapper = shallow(<TopUp onSubmit={mockedOnSubmit} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call onSubmit with the amount value', () => {
      const inputElement = wrapper.find('#top-up-field');
      inputElement.simulate('change', { target: { value: '25000' } });
      const buttonElement = wrapper.find('#top-up-button');
      buttonElement.simulate('click');

      expect(mockedOnSubmit).toHaveBeenCalledWith('25000');
    });
  });
});
