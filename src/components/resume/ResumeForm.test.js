import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import ResumeForm from './ResumeForm';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

function setup() {
  const props = {
    
  };

  return shallow(<ResumeForm {...props } />);
}

describe('ResumeForm via Enzyme', () => {
  // it('renders form and h1', () => {
  //   const wrapper = setup();
  //   expect(wrapper.find('form').length).toBe(1);
  //   expect(wrapper.find('h1').text()).toEqual('Manage Resume');
  // });

  // it('renders SaveCancelDelete template', () => {
  //   const wrapper = setup(false, false);
  //   expect(wrapper.find('SaveCancelDelete').length).toBe(1);
  // });
});
