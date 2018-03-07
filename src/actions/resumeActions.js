import * as types from './actionTypes';
import resumeApi from '../api/mockResumeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadResumesSuccess(resumes) {
    return { type: types.LOAD_RESUMES_SUCCESS, resumes };
}

export function updateResumeSuccess(resume) {
    return { type: types.UPDATE_RESUME_SUCCESS, resume };
}

export function createResumeSuccess(resume) {
    return { type: types.CREATE_RESUME_SUCCESS, resume };
}

export function deleteResumeSuccess(resume) {
    return { type: types.DELETE_RESUME_SUCCESS, resume };
}

export function loadResumes() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return resumeApi.getAllResumes().then(resumes => {
            dispatch(loadResumesSuccess(resumes));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}

export function saveResume(resume) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return resumeApi.saveResume(resume).then(savedResume => {
            resume.id ? dispatch(updateResumeSuccess(savedResume)) :
                dispatch(createResumeSuccess(savedResume));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw (error);
        });
    };
}

export function deleteResume(resume) {
    return function (dispatch, getState) {
      dispatch(beginAjaxCall());
      return resumeApi.deleteResume(resume).then(deletedResume => {          
        dispatch(deleteResumeSuccess(deletedResume));
      }).catch(error => {
        dispatch(ajaxCallError());
        throw(error);
      });
    };
  }