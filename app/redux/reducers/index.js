import {combineReducers} from 'redux';
import {persistRouter, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// reducers
import auth from './authReducer';
import restaurents from './restaurentsReducer';

const storage = AsyncStorage;

const loginPersistConfig = {
  key: 'auth',
  whitelist: ['accessToken', 'username', 'registeredUsers'],
  storage,
};

const restaurentsPersistConfig = {
  key: 'restaurents',
  whitelist: ['restaurents'],
  storage,
};

export default () =>
  combineReducers({
    auth: persistReducer(loginPersistConfig, auth),
    restaurents: persistReducer(restaurentsPersistConfig, restaurents),
  });
