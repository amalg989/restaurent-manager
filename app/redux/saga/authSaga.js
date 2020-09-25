import {Alert} from 'react-native';
/*
 * Single Retailer Application 05.08.2020
 * Copyright © 2020 NCell. All rights reserved.
 */
import {put, takeLatest, select} from 'redux-saga/effects';
import {
  LOGIN,
  COMMON_TYPES,
  MAKE_API_REQUEST,
  REGISTER,
} from '../../constants/actionTypes';
import navigationService from '../../services/navigationService';

function* logout() {
  yield put({type: LOGIN.CLEAR_DATA});
  navigationService.reset('LogInScreen');
}

function* loginUser(action) {
  const registeredUsers = yield select(
    (state) => state.auth.registeredUsers || [],
  );

  if (registeredUsers.length > 0) {
    const userExists = registeredUsers.filter(
      (user) => action.payload.email === user.email,
    );

    if (userExists.length > 0) {
      if (userExists[0].password === action.payload.password) {
        navigationService.reset('HomeScreen');
      } else {
        Alert.alert('Invalid Email or password.');
      }
    } else {
      Alert.alert('User does not exists');
    }
  } else {
    Alert.alert('User does not exists');
  }
}

function* registerUser(action) {
  const registeredUsers = yield select(
    (state) => state.auth.registeredUsers || [],
  );

  if (registeredUsers.length > 0) {
    const userExists = registeredUsers.filter(
      (user) => action.payload.email === user.email,
    );

    if (userExists.length > 0) {
      Alert.alert('User already exists.');
      return false;
    }
  }

  Alert.alert('Registration successful.');

  yield put({
    type: REGISTER.REGISTER_USER + COMMON_TYPES.SUCCESS,
    payload: action.payload,
  });
  navigationService.reset('LogInScreen');
}

export default function* authSaga() {
  yield takeLatest(LOGIN.LOGIN_USERNAME + COMMON_TYPES.REQUEST, loginUser);
  yield takeLatest(LOGIN.LOGOUT + COMMON_TYPES.REQUEST, logout);
  yield takeLatest(REGISTER.LOGOUT + COMMON_TYPES.REQUEST, registerUser);
}
