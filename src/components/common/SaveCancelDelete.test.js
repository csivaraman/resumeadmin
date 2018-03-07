import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import SaveCancelDelete from './SaveCancelDelete';

function setup(saving, deleting) {
    const props = {
        saving: saving, deleting: deleting,
        onSave: () => { },        
        onDelete: () => { },
        onCancel: () => { }
    };

    return shallow(<SaveCancelDelete {...props} />);
}

// describe('SaveCancelDelete via Enzyme', () => {

//     it('save button is labeled "Save" when not saving', () => {
//         const wrapper = setup(false, false);
//         expect(wrapper.find('#savebutton').props().value).toBe('Save');
//     });

//     it('save button is labeled "Saving..." when saving', () => {
//         const wrapper = setup(true, false);
//         expect(wrapper.find('#savebutton').first().props().value).toBe('Saving...');
//     });

//     it('delete button is labeled "Delete" when not deleting', () => {
//         const wrapper = setup(false, false);
//         expect(wrapper.find('#deletebutton').props().value).toBe('Delete');
//     });

//     it('delete button is labeled "Deleting..." when deleting', () => {
//         const wrapper = setup(false, true);
//         expect(wrapper.find('#deletebutton').first().props().value).toBe('Deleting...');
//     });
// });
