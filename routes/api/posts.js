const express = require('express');
const router = express.Router();
const auth = require('../../midleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route POST api/posts
// @desc  add user posts
// @acces private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      let user = await User.findById(req.user.id).select('-password');
      console.log(req.user.id);

      if (!user)
        return res
          .status(404)
          .json({ msg: 'For some reason this user is not exist' });

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      const post = new Post(newPost);

      await post.save();

      res.send(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route GET api/posts
// @desc  get all post
// @acces private

router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route GET api/posts/:id
// @desc  get post by ID
// @acces private

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'No post found' });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(500).json({ msg: 'Post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route DELETE api/posts/:id
// @desc  delete a post by ID
// @acces private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(401).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    post.remove();

    res.json({ msg: 'Post remove' });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(500).json({ msg: 'Post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route PUT api/posts/likes/:post_id
// @desc  like a post
// @acces private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post aleready liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(500).json({ msg: 'Post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route PUT api/posts/dislike/:post_id
// @desc  unlike a post
// @acces private
router.put('/dislike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ==
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been like' });
    }

    post.likes = [
      ...post.likes.filter(like => like.user.toString() !== req.user.id)
    ];

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(500).json({ msg: 'Post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route PUT api/posts/coment/:post_id
// @desc  add a coment
// @acces private
router.put(
  '/coment/:post_id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.post_id);
      if (!post) return res.status(404).json({ msg: 'Post not found' });

      const user = await User.findById(req.user.id);
      if (!user)
        return res
          .status(404)
          .json({ msg: 'User not found' })
          .select('-password');

      const newComent = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };

      post.coments.unshift(newComent);

      await post.save();

      res.json(post.coments);
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId') {
        return res.status(500).json({ msg: 'Post not found' });
      }
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route DELETE api/posts/coment/:post_id
// @desc  delete a coment
// @acces private
router.delete('/coment/:comment_id/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.user.toString() !== req.user.id)
      return res.status(404).json({ msg: 'Not authorized' });

    const comments = post.coments;

    // Check if the comment exist
    const hasComment = comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!hasComment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    // Check the user who want to delete the comment
    if (hasComment.user != req.user.id)
      return res.status(401).json({ msg: 'Action not authorized' });

    // subject to bug
    const removeIndex = post.coments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.coments.splice(removeIndex, 1);

    await post.save();

    res.json(post.coments);
  } catch (error) {
    console.error(error);
    if (error.kind == 'ObjectId') {
      return res.status(500).json({ msg: 'Post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
