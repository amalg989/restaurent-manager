import {LOGIN, COMMON_TYPES, REGISTER} from '../../constants/actionTypes';

export const INIT_STATE = {
  loading: false,
  accessToken: '',
  state: '',
  username: '',
  registeredUsers: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN.CLEAR_DATA:
      return {...INIT_STATE, registeredUsers: state.registeredUsers};
    case REGISTER.REGISTER_USER + COMMON_TYPES.SUCCESS:
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, {...action.payload}],
      };
    default:
      return state;
  }
};
