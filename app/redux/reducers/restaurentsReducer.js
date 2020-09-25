import {RESTAURENTS, LOGIN, COMMON_TYPES} from '../../constants/actionTypes';

export const INIT_STATE = {
  loading: false,
  restaurents: [],
  state: '',
  username: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESTAURENTS.RESTAURENTS_LIST + COMMON_TYPES.REQUEST:
      return {...state, loading: true};
    case RESTAURENTS.RESTAURENTS_LIST + COMMON_TYPES.FAILURE:
      return {...state, loading: false};
    case RESTAURENTS.RESTAURENTS_LIST + COMMON_TYPES.SUCCESS:
      return {...state, loading: false, restaurents: action.payload.data};
    case LOGIN.CLEAR_DATA:
      return INIT_STATE;
    default:
      return state;
  }
};
