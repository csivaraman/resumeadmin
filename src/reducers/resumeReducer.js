import * as types from '../actions/actionTypes';
import resumesData from './../data/resume-data';

export default function resumeReducer(state = resumesData.resumes, action) {    
    switch (action.type) {
        case types.LOAD_RESUMES_SUCCESS:
            return action.resumes;

        case types.CREATE_RESUME_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.resume)
            ];

        case types.UPDATE_RESUME_SUCCESS:
            return [
                ...state.filter(resume => resume.id !== action.resume.id),
                Object.assign({}, action.resume)
            ];

        case types.DELETE_RESUME_SUCCESS:
            return [
                ...state.filter(resume => resume.id !== action.resume.id)                
            ];
        default:
            return state;
    }
}