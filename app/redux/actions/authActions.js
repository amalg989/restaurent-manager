import {LOGIN, REGISTER, COMMON_TYPES} from '../../constants/actionTypes';

export const login = (payload, callback) => ({
  type: LOGIN.LOGIN_USERNAME + COMMON_TYPES.REQUEST,
  payload,
  callback,
});

export const registerUser = (payload, callback) => ({
  type: REGISTER.LOGOUT + COMMON_TYPES.REQUEST,
  payload,
  callback,
});

export const logout = (payload, callback) => ({
  type: LOGIN.LOGOUT + COMMON_TYPES.REQUEST,
  payload,
  callback,
});
