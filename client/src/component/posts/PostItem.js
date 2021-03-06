import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../action/post";

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, coments, date },
  auth,
  addLike,
  removeLike,
  deletePost,
  showAction
}) => {
  return (
    <Fragment>
      <div className="posts">
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img className="round-img" src={avatar} alt="" />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{text}</p>
            <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showAction && (
              <Fragment>
                {" "}
                <button
                  onClick={() => addLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-up"></i>
                  {likes.length > 0 && <span>{likes.length}</span>}
                </button>
                <button
                  onClick={() => removeLike(_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${_id}`} className="btn btn-primary">
                  Discussion{" "}
                  {coments.length > 0 && (
                    <span className="comment-count">{coments.length}</span>
                  )}
                </Link>
                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={() => deletePost(_id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = { showAction: true };

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
