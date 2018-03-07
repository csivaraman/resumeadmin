import * as types from './actionTypes';
import loginApi from '../api/mockLoginApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function isAuthenticatedSuccess(isAuth) {
    return { type: types.IS_AUTHENTICATED_SUCCESS, isAuth};
}

export function registerSuccess(user) {
    return { type: types.REGISTER_SUCCESS, user };
}

export function loginSuccess(user) {
    return { type: types.LOGIN_SUCCESS, user };
}

export function logoutSuccess() {
    return { type: types.LOGOUT_SUCCESS};
}

export function getAllUsersSuccess(users) {
    return { type: types.GET_ALL_USERS_SUCCESS, users };
}

export function deleteUserSuccess(user) {
    return { type: types.DELETE_USER_SUCCESS, user };
}


export function isAuthenticated() {
    return function (dispatch) {
        return loginApi.isAuthenticated();
    };
}

export function register(user) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return loginApi.register(user).then(user => {            
            dispatch(registerSuccess(user));
        }).catch(error => {            
            dispatch(ajaxCallError);
            throw (error);
        });
    };
}

export function login(username, password) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return loginApi.login(username, password).then(user => {
            dispatch(loginSuccess(user));
        }).catch(error => {            
            dispatch(ajaxCallError);
            throw (error);
        });
    };
}

export function logout() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return loginApi.logout().then(() => {
            dispatch(logoutSuccess());
        }).catch(error => {
            dispatch(ajaxCallError);
            throw (error);
        });
    };
}

export function getAllUsers() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return loginApi.getAllUsers().then(users => {
            dispatch(getAllUsersSuccess(users));
        }).catch(error => {
            dispatch(ajaxCallError);
            throw (error);
        });
    };
}

export function deleteUser(id) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return loginApi.deleteUser(id).then(user => {
            dispatch(deleteUserSuccess(user));
        }).catch(error => {
            dispatch(ajaxCallError);
            throw (error);
        });
    };
}
