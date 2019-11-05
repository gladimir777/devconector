import axios from 'axios';

import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERORR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
  //GET_PROFILE_BY_USER_ID
} from './type';

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

// Get profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get profile by userId
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
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

// Get github username
export const getGithubRepos = userName => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${userName}`);
    dispatch({
      type: GET_REPOS,
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

// Add experince
export const addExperience = (formData, history) => async dispatch => {
  const config = {
    Headers: {
      'Content-type': 'application/json'
    }
  };

  try {
    const response = await axios.put(
      'api/profile/experience',
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
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

// Add education
export const addEducation = (formData, history) => async dispatch => {
  const config = {
    Headers: {
      'Content-type': 'application/json'
    }
  };
  try {
    const response = await axios.put('api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
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

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education removed', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERORR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? this can not be undone')) {
    try {
      await axios.delete(`/api/profile`);
      dispatch({
        type: DELETE_ACCOUNT
      });
      dispatch({
        type: CLEAR_PROFILE
      });

      dispatch(setAlert('Account removed', 'success'));
    } catch (error) {
      dispatch({
        type: PROFILE_ERORR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
};
