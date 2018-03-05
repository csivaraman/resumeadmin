import expect from 'expect';
import * as resumeActions from './resumeActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Resume Actions', () => {
  describe('createResumeSuccess', () => {
    it('should create a CREATE_RESUME_SUCCESS action', () => {
      //arrange
      const resume = {id: 10, title: 'Test resume item.'};
      const expectedAction = {
        type: types.CREATE_RESUME_SUCCESS,
        resume: resume
      };

      //act
      const action = resumeActions.createResumeSuccess(resume);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_RESUMES_SUCCESS when loading resume items', (done) => {
    // Here's an example call to nock.
    // nock('http://example.com/')
    //   .get('/resumes')
    //   .reply(200, { body: { resume: [{ id: 1, title: 'Test title'}] }});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_RESUMES_SUCCESS, body: {resumes: [{id: 10, title: 'Test resume title.'}]}}
    ];

    const store = mockStore({resumes: []}, expectedActions, done);
    store.dispatch(resumeActions.loadResumes()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_RESUMES_SUCCESS);
      done();
    });
  });
});

