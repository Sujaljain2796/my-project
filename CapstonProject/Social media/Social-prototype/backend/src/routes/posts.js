const express = require('express');
const { Post, User, Like, Comment } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const posts = await Post.findAll({
    include: [User, Like, { model: Comment, include: [User] }],
    order: [['createdAt', 'DESC']]
  });
  res.json(posts);
});

router.post('/', auth, async (req, res) => {
  const { content, image } = req.body;
  const post = await Post.create({ content, image, UserId: req.user.id });
  res.json(post);
});

router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  const existing = await Like.findOne({ where: { PostId: post.id, UserId: req.user.id } });
  if (existing) {
    await existing.destroy();
    return res.json({ liked: false });
  }
  await Like.create({ PostId: post.id, UserId: req.user.id });
  res.json({ liked: true });
});

router.post('/:id/comment', auth, async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.create({ content, UserId: req.user.id, PostId: req.params.id });
  res.json(comment);
});

module.exports = router;
