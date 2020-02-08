import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_POST,
  ADD_COMENT,
  REMOVE_COMENT
} from "./type";

export const getPosts = () => async dispatch => {
  try {
    const response = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: response.data });
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const getPost = id => async dispatch => {
  try {
    const response = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: response.data });
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.status, status: error.response.status }
    });
  }
};

//Add likes
export const addLike = postId => async dispatch => {
  try {
    const response = await axios.put(`/api/posts/like/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: response.data } });
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Remove like
export const removeLike = postId => async dispatch => {
  try {
    const response = await axios.put(`/api/posts/dislike/${postId}`);

    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: response.data } });
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//delete post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({ type: DELETE_POST, payload: postId });

    dispatch(setAlert("Post removed", "succes"));
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//add post
export const addPost = formData => async dispatch => {
  const config = {
    Headers: {
      "Content-type": "application/json"
    }
  };

  try {
    const response = await axios.post(`/api/posts`, formData, config);

    dispatch({ type: ADD_POST, payload: response.data });

    dispatch(setAlert("Post created", "success"));
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const addComent = (postId, formData) => async dispatch => {
  const config = {
    Headers: {
      "Content-type": "application/json"
    }
  };

  console.log("test");

  try {
    const response = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({ type: ADD_COMENT, payload: response.data });

    dispatch(setAlert("Comment added", "success"));
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const deleteComent = (postId, comentId) => async dispatch => {
  try {
    const response = await axios.delete(
      `/api/posts/comment/${comentId}/${postId}`
    );

    dispatch({ type: REMOVE_COMENT, payload: comentId });

    dispatch(setAlert("Comment deleted", "success"));
  } catch (error) {
    setAlert(error.msg, "danger");
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
