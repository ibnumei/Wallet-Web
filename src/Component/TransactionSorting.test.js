import React from 'react';
import { shallow } from 'enzyme';
import TransactionSorting from './TransactionSorting';

describe('TransactionSorting', () => {
  describe('#render', () => {
    let wrapper;
    let onSortDateMock;
    let onSortAmountMock;

    beforeEach(() => {
      onSortDateMock = jest.fn();
      onSortAmountMock = jest.fn();
      wrapper = shallow(<TransactionSorting
        onSortDate={onSortDateMock}
        onSortAmount={onSortAmountMock}
      />);
    });

    it('should render dropdown element for sorting transactions', () => {
      expect(wrapper.find(('#sort-input'))).toHaveLength(1);
    });

    it('should call onChange with oldest date', () => {
      wrapper.find('#sort-input').simulate('change', {
        target: {
          name: 'sort',
          value: 'oldest-date'
        }
      });

      expect(onSortDateMock).toHaveBeenCalledWith('oldest-date');
    });

    it('should call onChange with lowest amount', () => {
      wrapper.find('#sort-input').simulate('change', {
        target: {
          name: 'sort',
          value: 'lowest-amount'
        }
      });

      expect(onSortAmountMock).toHaveBeenCalledWith('lowest-amount');
    });
  });
});
