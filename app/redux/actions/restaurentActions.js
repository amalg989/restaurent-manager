import {RESTAURENTS, COMMON_TYPES} from '../../constants/actionTypes';

export const getAllRestaurents = (payload, callback) => ({
  type: RESTAURENTS.RESTAURENTS_LIST + COMMON_TYPES.REQUEST,
  payload,
  callback,
});
