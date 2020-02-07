const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dbCon = require('../../config/db');
const router = express.Router();
const user = require('../../models/user.model');

// @route   GET api/users
// @desc    Get all users
// @access  Private

router.get('/', async (req, res) => {
  try {
    let result = await user.getAll();
    if (!result.length) {
      return res.status(400).json({ error: 'Users not found.' });
    }
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// @route   GET api/users/:id
// @desc    Get user by id
// @access  Private

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let result = await user.getOne(id, ['id']);
    if (!result.length) {
      return res.status(400).json({ error: 'User not found.' });
    }
    res.json(result[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// @route   POST api/users
// @desc    Add a new user
// @access  Private

router.post(
  '/',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Password with minimum of 6 characteres required'
    ).isLength({ min: 6 }),
    check('email').normalizeEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists
    const { username, email, password, phone } = req.body;

    try {
      let result = await user.getOne(username, 'username');
      if (result.length)
        return res.status(400).json({ error: 'Invalid username' });
      try {
        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        hashed_password = await bcrypt.hash(password, salt);

        //Insert into database

        newUser = { username, password: hashed_password, email, phone };

        let result = await user.create(newUser);

        if (result) return res.json({ result, username, email, phone });

        return res.status(400).json({ error: 'Could not create new user' });
      } catch (e) {
        console.log(e);
        return res.sendStatus(500);
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
);

// @route   Delete api/users/:id
// @desc    Delete user by id
// @access  Private

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let result = await user.delete(id);
    if (result) return res.json({ message: 'User deleted.' });
    res.status(400).json({ error: 'Could not deleted user.' });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// @route   Put api/users/:id
// @desc    Update user info
// @access  Private

router.put('/:id', async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const { email, phone } = req.body;

  const updatedUser = {
    id: 1,
    username: 'jpcoelho',
    email: 'jcoelho@silvex.pt',
    phone: '929218424'
  };

  try {
    let result = await user.update(updatedUser);
    return res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
