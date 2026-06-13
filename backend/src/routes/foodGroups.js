const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  const groups = db.prepare('SELECT * FROM food_groups ORDER BY order_index ASC').all();
  res.json(groups);
});

module.exports = router;
