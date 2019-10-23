const express = require('express');
const auth = require('../../midleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();

// @route GET api/profile/me
// @desc  Get the current user profile
// @acces private
router.get('/me', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'User',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for that user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
