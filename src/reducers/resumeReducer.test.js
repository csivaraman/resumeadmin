import expect from 'expect';
import resumeReducer from './resumeReducer';
import * as actions from '../actions/resumeActions';

describe('Resume Reducer', () => {
  it('should add resume item when passed CREATE_RESUME_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 1, title: 'Resume 1'},
      {id: 2, title: 'Resume 2'}
    ];

    const newResume = {id: 3, title: 'Resume 3'};

    const action = actions.createResumeSuccess(newResume);

    //act
    const newState = resumeReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('Resume 1');
    expect(newState[1].title).toEqual('Resume 2');
    expect(newState[2].title).toEqual('Resume 3');
  });

  it('should update course when passed UPDATE_RESUME_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 1, title: 'Resume 1'},
      {id: 2, title: 'Resume 2'},
      {id: 3, title: 'Resume 3'}
    ];

    const resume = {id: 2, title: 'Resume 2 New'};
    const action = actions.updateResumeSuccess(resume);

    // act
    const newState = resumeReducer(initialState, action);
    const updatedResume = newState.find(a => a.id == resume.id);
    const untouchedResume = newState.find(a => a.id == 1);

    // assert
    expect(updatedResume.title).toEqual('Resume 2 New');
    expect(untouchedResume.title).toEqual('Resume 1');
    expect(newState.length).toEqual(3);
  });
});
