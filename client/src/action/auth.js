import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCES } from './type';
import { setAlert } from './alert';

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
    console.log(res.data);
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
