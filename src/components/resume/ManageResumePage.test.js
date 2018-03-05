import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageResumePage } from './ManageResumePage';

describe('Manage Resume Page', () => {
  // it('sets error message when trying to save empty title', () => {
  //   const props = {
  //     actions: { saveResume: () => { return Promise.resolve(); } },
  //     resume: { id: 2, title: '', description: '' }
  //   };

  //   const context = {      
  //       router: { setRouteLeaveHook: () => { } }      
  //   };

  //   const wrapper = mount(<ManageResumePage {...props} />, {context});
  //   const saveButton = wrapper.find('input').first();
  //   expect(saveButton.prop('type')).toBe('submit');
  //   saveButton.simulate('click');
  //   expect(wrapper.state().errors.title).toBe('Title must be at least 3 characters.');

  // });
});
