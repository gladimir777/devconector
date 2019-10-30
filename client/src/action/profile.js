import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERORR } from './type';

// Get the current user
export const getCurrentUser = () => async dispatch => {
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
