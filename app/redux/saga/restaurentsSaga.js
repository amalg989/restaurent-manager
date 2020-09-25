/*
 * Single Retailer Application 05.08.2020
 * Copyright © 2020 NCell. All rights reserved.
 */
import {put, takeLatest, take} from 'redux-saga/effects';
import {
  RESTAURENTS,
  COMMON_TYPES,
  MAKE_API_REQUEST,
} from '../../constants/actionTypes';
import {getRestaurents} from '../apis';

function* getAllRestaurents() {
  const payload = {
    api: getRestaurents,
    action: RESTAURENTS.RESTAURENTS_LIST,
  };
  yield put({type: MAKE_API_REQUEST, payload});
}

export default function* restaurentsSaga() {
  yield takeLatest(
    RESTAURENTS.RESTAURENTS_LIST + COMMON_TYPES.REQUEST,
    getAllRestaurents,
  );
}
