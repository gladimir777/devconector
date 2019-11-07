import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spiner from '../layout/Spiner';
import PostItem from './PostItem';
import { getPosts } from '../../action/post';

const Post = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spiner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

Post.propTypes = {
  getPosts: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Post);
