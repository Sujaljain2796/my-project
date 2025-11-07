const express = require('express');
const { User, Post } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * @route GET /api/users/me
 * @desc  Get logged-in user's profile
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'createdAt'],
      include: [{ model: Post }]
    });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route GET /api/users/:id
 * @desc  Get public profile of a user (by ID)
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'createdAt'],
      include: [{ model: Post }]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
