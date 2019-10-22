const express = require('express');
const router = express.Router();

// @route GET api/profile
// @desc  test route
// @acces public
router.get('/', (req, res) => {
  res.send('Profile route');
});

module.exports = router;
