const express = require('express');

const db = require('./data/db');

const router = express.Router();

// /api/posts

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json();
  }
});

module.exports = router;