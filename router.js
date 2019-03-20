const express = require('express');

const db = require('./data/db');

const router = express.Router();

// /api/posts

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, contents } = req.body;
    const newPost = { title, contents };

    console.log(`req.body: `, req.body);
    console.log(`newPost: `, newPost);

    if (!title || !contents) {
      return res.status(400)
        .json({ errorMessage: "Please provide title and contents for the post." });
    } else {
      await db.insert(newPost)
        .then(post => {
          res.status(201).json(post);
        })
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.param.id;
    const post = await db.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
})

module.exports = router;