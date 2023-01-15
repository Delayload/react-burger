import {
    register as registerRequest,
    login as loginRequest,
    logout as logoutRequest,
    resetPassword as resetPasswordRequest,
    forgotPassword as forgotPasswordRequest,
    setUserData as setUserDataRequest
} from '../../utils/api';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const REGISTRATION_REQUSET = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCES = 'FORGOT_PASSWORD_SUCCES';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const SET_USER_DATA_REQUEST = 'SET_USER_DATA_REQUEST';
export const SET_USER_DATA_SUCCES = 'SET_USER_DATA_SUCCES';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';

export function regiser(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTRATION_REQUSET,
        });

        registerRequest(email, password, name)
            .then(data => dispatch({
                type: REGISTRATION_SUCCESS,
                payload: data,
            }))
            .catch(error => dispatch({
                type: REGISTRATION_FAILED,
                payload: {
                    message: error,
                },
            }));
    };
}

export function login(email, password) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });

        loginRequest(email, password)
            .then(data => dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            }))
            .catch(error => dispatch({
                type: LOGIN_FAILED,
                payload: {
                    message: error,
                },
            }));
    };
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });

        logoutRequest()
            .then(data => dispatch({
                type: LOGOUT_SUCCESS,
            }))
            .catch(error => dispatch({
                type: LOGOUT_FAILED,
                payload: {
                    message: error,
                },
            }));
    };
}

export function resetPassword(password, token) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });

        resetPasswordRequest(password, token)
            .then(data => dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: data,
            }))
            .catch(error => dispatch({
                type: RESET_PASSWORD_FAILED,
                payload: {
                    message: error,
                },
            }));
    };
}

export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });

        forgotPasswordRequest(email)
            .then(data => dispatch({
                type: FORGOT_PASSWORD_SUCCES,
                payload: data,
            }))
            .catch(error => dispatch({
                type: FORGOT_PASSWORD_FAILED,
                payload: {
                    message: error,
                },
            }));
    };
}

export function setUserData(name, email, password) {
    return function (dispatch) {
        dispatch({
            type: SET_USER_DATA_REQUEST,
        });

        setUserDataRequest(name, email, password)
            .then(data => dispatch({
                type: SET_USER_DATA_SUCCES,
                payload: data,
            }))
            .catch(error => dispatch({
                type: SET_USER_DATA_FAILED,
                payload: {
                    message: error,
                },
            }));
    };
}