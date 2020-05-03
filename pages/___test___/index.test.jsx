import React from 'react';
import { mount } from 'enzyme';
import Index from '../index';
// instance của index page
describe('index page', () => {
  // it('mô tả sự kiện test')... expect(logic)
  it('should have App component', () => {
    const subject = mount(<Index />);

    expect(subject.find('App')).toHaveLength(1);
  });
});
