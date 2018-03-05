import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case types.LOGOUT_SUCCESS:
            return {   
                loggedIn: false                           
            };
        case types.REGISTER_SUCCESS:
            return {
                user: action.user
            };
        case types.GET_ALL_USERS_SUCCESS:
            return {
                users: action.users
            };
        case types.DELETE_USER_SUCCESS:
            // remove deleted user from state
            return {
                users: state.users.filter(user => user.id !== action.id)
            };
        default:
            return state;
    }
}