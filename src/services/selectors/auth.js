import {pipe} from '../../utils/constants';

export const authSelector = (state) => state.auth;
export const userAuthSelector = pipe(authSelector, (authData => authData.user));
export const isLoggedInAuthSelector = pipe(authSelector, (authData => authData.isLoggedIn));
export const isForgotPasswordSucceedAuthSelector = pipe(authSelector, (authData => authData.isForgotPasswordSucceed));