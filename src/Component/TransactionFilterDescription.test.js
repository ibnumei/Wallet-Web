import React from 'react';
import { shallow } from 'enzyme';
import TransactionFilterDescription from './TransactionFilterDescription';

describe('TransactionFilterDescription', () => {
  describe('#render', () => {
    let wrapper;
    let mockedOnFilter;

    beforeEach(() => {
      mockedOnFilter = jest.fn();
      wrapper = shallow(<TransactionFilterDescription onFilter={mockedOnFilter} />);
    });

    it('should render transaction filter field', () => {
      expect(wrapper.find('#filter')).toHaveLength(1);
    });

    it('should call on filter when typing the description', () => {
      const elementInput = wrapper.find('#filter');
      const inputEvent = { target: { name: 'filter', value: 'this is search description' } };

      elementInput.simulate('change', inputEvent);

      expect(mockedOnFilter).toHaveBeenCalledWith('this is search description');
    });
  });
});
