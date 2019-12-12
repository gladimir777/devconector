import React, { useState } from "react";
import PropTypes from "prop-types";
import { addComent } from "../../action/post";
import { connect } from "react-redux";

const PostForm = ({ postId, addComent }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComent(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          onChange={e => setText(e.target.value)}
          value={text}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addComent: PropTypes.func.isRequired
};

export default connect(null, { addComent })(PostForm);
