import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERORR } from './type';

// Get the current user
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Create profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const config = {
    Headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
