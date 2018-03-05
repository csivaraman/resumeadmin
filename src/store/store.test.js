import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';
import * as resumeActions from '../actions/resumeActions';

describe('Store', function() {
  it('Should handle creating courses', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      title: "Clean Code"
    };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const actual = store.getState().courses[0];
    const expected = {
      title: "Clean Code"
    };

    expect(actual).toEqual(expected);
  });

  // it('Should handle creating and updating resume items', function() {
  //   // arrange
  //   const store = createStore(rootReducer, initialState);
  //   const resume = {
  //     id: 10,
  //     title: "Test resume item"
  //   };

  //   const newResume = {
  //     id: 10,
  //     title: "New test resume item"
  //   };

  //   // act
  //   const actions = [
  //     resumeActions.createResumeSuccess(resume),
  //     resumeActions.updateResumeSuccess(newResume)
  //     ];

  //   store.dispatch(actions[0]);

  //   // assert for create
  //   const actualNew = store.getState().resumes[1];
  //   const expectedNew = {
  //     id: 10,
  //     title: "Test resume item"
  //   };

  //   expect(actualNew).toEqual(expectedNew);

  //   // act and assert for update
  //   store.dispatch(actions[1]);

  //   const actualUpdated = store.getState().resumes.find(r => r.id === 10)[0];
  //   const expectedUpdated = {
  //     id: 10,
  //     title: "New test resume item"
  //   };

  //   expect(actualUpdated).toEqual(expectedUpdated);
  // });
});
