import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,

    REGISTRATION_REQUSET,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCES,
    FORGOT_PASSWORD_FAILED,

} from "../actions/Auth";

import { setCookie, deleteCookie } from '../../utils/cookie';

const initialState = {
    registrationRequset: false,
    registrationFailed: false,
    registrationFailedMessage: null,

    loginRequset: false,
    loginFailed: false,
    loginFailedMessage: null,

    logoutRequest: false,
    logoutFailed: false,
    logoutFailedMessage: null,

    forgotPasswordRequset: false,
    forgotPasswordFailed: false,
    forgotPasswordFailedMessage: null,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordMessage: null,

    user: null,
    isLoggedIn: false,
    isForgotPasswordSucceed: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_REQUSET: {
            return {
                ...state,
                registrationRequset: true,
            };
        }
        case REGISTRATION_SUCCESS: {
            const { user, accessToken, refreshToken } = action.payload;

            setCookie('token', accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', refreshToken);

            return {
                ...state,
                registrationRequset: false,
                user,
                registrationFailedMessage: null,
            };
        }
        case REGISTRATION_FAILED: {
            const { message } = action.payload;

            return {
                ...state,
                registrationRequset: false,
                registrationFailed: true,
                registrationFailedMessage: message,
            };
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
            };
        }
        case LOGIN_SUCCESS: {
            const { user, accessToken, refreshToken } = action.payload;

            setCookie('token', accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', refreshToken);

            return {
                ...state,
                loginRequset: false,
                user,
                loginFailedMessage: null,
                isLoggedIn: true,
            }
        }
        case LOGIN_FAILED: {
            const { message } = action.payload;

            return {
                ...state,
                loginRequset: false,
                loginFailed: true,
                loginFailedMessage: message,
            };
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
            };
        }
        case LOGOUT_SUCCESS: {
            deleteCookie('token');
            localStorage.removeItem('refreshToken');

            return {
                ...state,
                logoutRequest: false,
                user: initialState.user,
                logoutFailedMessage: null,
                isLoggedIn: false,
            };
        }
        case LOGOUT_FAILED: {
            const { message } = action.payload;

            return {
                ...state,
                loginRequset: false,
                logoutFailed: true,
                logoutFailedMessage: message,
            };
        }

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequset: true
            };
        }
        case FORGOT_PASSWORD_SUCCES: {
            return {
                ...state,
                forgotPasswordRequset: false,
                isForgotPasswordSucceed: true,
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            const { message } = action.payload;

            return {
                ...state,
                forgotPasswordRequset: false,
                forgotPasswordFailed: true,
                forgotPasswordFailedMessage: message,
            };
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            const { message } = action.payload;

            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordMessage: message,
            };
        }
        case RESET_PASSWORD_FAILED: {
            const { message } = action.payload;

            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                resetPasswordMessage: message,
            };
        }

        default: {
            return state;
        }
    }
};