import {
  GET_PROFILE,
  PROFILE_ERORR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../action/type';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case PROFILE_ERORR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: {},
        profiles: []
      };
    default:
      return state;
  }
}
