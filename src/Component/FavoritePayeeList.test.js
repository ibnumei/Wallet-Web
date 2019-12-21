import React from 'react';
import { shallow } from 'enzyme';
import FavoritePayeeList from './FavoritePayeeList';

describe('FavoritePayeeList', () => {
  describe('#render', () => {
    let favoritPayee;
    let onSelectMock;
    beforeEach(() => {
      favoritPayee = [{
        id: 1,
        userId: 1,
        payeeId: 2,
        nickname: 'AditsChips',
        user: {
          cashtag: 'adit',
          name: 'Adit'
        },
        createdAt: '2019-11-30T15:05:04.628Z',
        updatedAt: '2019-11-30T15:05:04.628Z'
      }];
      onSelectMock = jest.fn();
    });

    it('should contain one data in list transactions ', () => {
      const wrapper = shallow(<FavoritePayeeList list={favoritPayee} />);

      const Element = wrapper.find('tbody');
      const trElement = Element.find('tr');
      expect(trElement).toHaveLength(1);
    });

    it('should contain matching payee data in the list', () => {
      const wrapper = shallow(<FavoritePayeeList list={favoritPayee} />);

      const Element = wrapper.find('tbody');
      const trElement = Element.find('tr').first();

      expect(trElement.find('td').at(0).text()).toEqual('Adit');
      expect(trElement.find('td').at(1).text()).toEqual('adit');
    });

    it('should called on select function when list is selected', () => {
      const wrapper = shallow(<FavoritePayeeList list={favoritPayee} onSelect={onSelectMock} />);
      const Element = wrapper.find('tbody');
      const trElement = Element.find('tr').first();

      const tdElement = trElement.find('td').at(2);
      tdElement.find('button').simulate('click');

      expect(onSelectMock).toHaveBeenCalledWith(favoritPayee[0]);
    });
  });
});
