const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();

// User model
const User = require('../../models/User');

// @route POST api/user
// @desc  register user
// @acces public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ error: [{ mesage: 'User aleready exist' }] });
      }
      // Get user gravatar
      const avantar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      // Encrypt password
      user = new User({ name, email, password, avantar });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Get user token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecrete'),
        { expiresIn: 36000000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
