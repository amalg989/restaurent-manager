import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from 'redux-persist';
import createRootReducer from '../reducers';

import authSaga from '../saga/authSaga';
import requestSaga from '../saga/requestSaga';
import restaurentsSaga from '../saga/restaurentsSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadState) {
  const store = createStore(
    createRootReducer(),
    preloadState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(authSaga);
  sagaMiddleware.run(requestSaga);
  sagaMiddleware.run(restaurentsSaga);
  return {store, persistor};
}
