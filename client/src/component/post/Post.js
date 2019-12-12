import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spiner from "../layout/Spiner";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/PostForm";

import { getPost } from "../../action/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post == null ? (
    <Spiner />
  ) : (
    <Fragment>
      <Link to="/posts">Back to posts</Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
