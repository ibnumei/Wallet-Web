import React from 'react';
import { shallow } from 'enzyme';
import Notification from './Notification';

describe('Notification', () => {
  describe('#render', () => {
    it('should render success notification when props success is true', () => {
      const wrapper = shallow(<Notification message="success notification" success />);

      expect(wrapper.find('#success-notification')).toHaveLength(1);
      expect(wrapper.find('#error-notification')).toHaveLength(0);
    });

    it('should render failed notification when props success is false', () => {
      const wrapper = shallow(<Notification message="success notification" success={false} />);

      expect(wrapper.find('#success-notification')).toHaveLength(0);
      expect(wrapper.find('#error-notification')).toHaveLength(1);
    });

    it('should close notification when close button is clicked', () => {
      const wrapper = shallow(<Notification message="success notification" success />);
      const buttonCloseElement = wrapper.find('#notification-close-button');

      buttonCloseElement.simulate('click');

      expect(wrapper.find('#success-notification').props().className).toEqual('success-notification closed');
    });
  });
});
