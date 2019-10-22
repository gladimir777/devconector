const express = require('express');
const router = express.Router();

// @route GET api/user
// @desc  test route
// @acces public
router.get('/', (req, res) => {
  res.send('User route');
});

module.exports = router;
