import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  USER_LOADED,
  AU,
  AUTH_ERROR
} from '../action/type';

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  user: null,
  isAuthenticated: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        ...payload,
        isAuthenticated: true
      };
    case REGISTER_SUCCES:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
