import log from 'loglevel';
import {call, put, takeEvery} from 'redux-saga/effects';
import {MAKE_API_REQUEST, COMMON_TYPES} from '../../constants/actionTypes';
import {MESSAGES, NETWORK_STATUS_CODE} from '../../constants/common';

/** Saga to be called to make API calls. Will handle all exceptions and show relevant error messages. */
function* networkRequestSaga(action) {
  try {
    const response = yield call(
      action.payload.api,
      action.payload.payload,
      action.payload.axiosConfig,
    );
    log.info('response', response);

    let toastMessage = MESSAGES.FAILED;

    switch (
      response.status ||
      (response.respInfo && response.respInfo.status)
    ) {
      case NETWORK_STATUS_CODE.SUCCESS:
        // Will fire a success action if stats code is 200
        if (action.payload.responseYupSchema) {
          action.payload.responseYupSchema.validateSync(response.data);
        }
        yield put({
          type: action.payload.action + COMMON_TYPES.SUCCESS,
          payload: response.data,
        });
        if (action.payload.message) {
          console.log(action.payload.message);
        }

        break;
      case NETWORK_STATUS_CODE.UNAUTHORIZED:
        toastMessage = MESSAGES.UNAUTHORIZED;

      /// /////////////////////////////////
      // ADD LOGIC TO HANDLE 401 & REFRESH TOKEN
      /// /////////////////////////////////

      // eslint-disable-next-line no-fallthrough
      case NETWORK_STATUS_CODE.NOT_FOUND:
        toastMessage = MESSAGES.NOT_FOUND;
      // eslint-disable-next-line no-fallthrough
      case NETWORK_STATUS_CODE.INTERNAL_STATUS_ERROR:
        toastMessage = MESSAGES.FAILED;
      // eslint-disable-next-line no-fallthrough
      case NETWORK_STATUS_CODE.UNPROCURABLE_ENTITY:
        if (response.data.errors) {
          toastMessage = Object.keys(response.data.errors)
            .map((key) => response.data.errors[key].join(', '))
            .join(', ');
        }
      // eslint-disable-next-line no-fallthrough
      case NETWORK_STATUS_CODE.NOT_ACCEPTABLE:
        if (response.data.errors) {
          toastMessage = Object.keys(response.data.errors)
            .map((key) => response.data.errors[key].join(', '))
            .join(', ');
        } else {
          // eslint-disable-next-line no-unused-vars
          toastMessage = response.data.status;
        }
      // eslint-disable-next-line no-fallthrough
      default:
        yield put({type: action.payload.action + COMMON_TYPES.FAILURE});
    }
  } catch (err) {
    yield put({type: action.payload.action + COMMON_TYPES.FAILURE});
  }
}

export default function* requestSaga() {
  yield takeEvery(MAKE_API_REQUEST, networkRequestSaga);
}
