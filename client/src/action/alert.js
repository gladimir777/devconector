import uuid from 'uuid/v4';
import { SET_ALERT, REMOVE_ALERT } from './type';

export const setAlert = (message, alertType, timeout = 5000) => dispacth => {
  const id = uuid();

  dispacth({
    type: SET_ALERT,
    payload: {
      id,
      message,
      alertType
    }
  });

  // Remove alert action
  setTimeout(() => dispacth({ type: REMOVE_ALERT, payload: id }), timeout);
};
