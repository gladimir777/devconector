import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCES,
  USER_LOADED,
  AUTH_ERROR
} from './type';

import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Set heades with token
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    Headers: {
      'Content-type': 'application/json'
    }
  };

  const body = {
    name,
    email,
    password
  };

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({ type: REGISTER_SUCCES, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
