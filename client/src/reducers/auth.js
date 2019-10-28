import { REGISTER_SUCCES, REGISTER_FAIL } from '../action/type';
const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  user: null,
  isAuthenticated: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCES:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true
      };

    case REGISTER_FAIL:
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
