import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCES,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_PROFILE
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

//Register user
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
    dispatch(loadUser());
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

//Login user
export const login = (email, password) => async dispatch => {
  const config = {
    Headers: {
      'Content-type': 'application/json'
    }
  };

  const body = {
    email,
    password
  };

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({ type: LOGIN_SUCCES, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Log the user out
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOG_OUT });
};
