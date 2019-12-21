import { shallow } from 'enzyme';
import React from 'react';
import TransactionFilterAmount from './TransactionFilterAmount';

describe('TransactionFilterAmount', () => {
  describe('#render', () => {
    let wrapper;
    let mockedOnAmountFilter;
    let inputValue;
    beforeEach(() => {
      inputValue = ['1000', '50000'];
      mockedOnAmountFilter = jest.fn();
      wrapper = shallow(<TransactionFilterAmount
        onAmountFilter={mockedOnAmountFilter}
        value={inputValue}
      />);
    });

    it('should render input range element', () => {
      const rangeElement = wrapper.find('#rangeInput');

      expect(rangeElement).toHaveLength(1);
    });

    it('should call on amount filter when type and amount is inputted', () => {
      const rangeElement = wrapper.find('#rangeInput');

      rangeElement.simulate('change', inputValue);

      expect(mockedOnAmountFilter).toHaveBeenCalledWith(inputValue);
    });
  });
});
