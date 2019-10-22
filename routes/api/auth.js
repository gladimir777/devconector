const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc  test route
// @acces public
router.get('/', (req, res) => {
  res.send('Auth route');
});

module.exports = router;
