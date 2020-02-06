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
    let result = await user.getOne(id);
    if (!result.length)
      return res.status(400).json({ erro: 'User not found.' });
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
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // Check if user exists
    const { username, email } = req.body;
    var { password } = req.body;

    dbCon.query(
      `SELECT username FROM ${tbl} WHERE username = ?`,
      [username],
      async (err, rows) => {
        if (err) {
          return res.status(500).send('Server Error');
        }
        if (rows.length > 0) {
          return res.status(400).send({ errors: 'Invalid Username' });
        }

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        data = { username, password, email };

        // Insert User into Database
        dbCon.query(`INSERT INTO ${tbl} SET ?`, [data], (err, rows) => {
          if (err) {
            return res.status(500).send('Server Error');
          }
          res.json({ id: rows.insertId, username });
        });
      }
    );
  }
);

// @route   Delete api/users/:id
// @desc    Delete user by id
// @access  Private

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  dbCon.query(`DELETE FROM ${tbl} WHERE id=?`, [id], (err, rows) => {
    if (err) return res.status(500).send('Server Error');
    if (rows.affectedRows) return res.json({ message: `User deleted.` });
    res.status(400).json({ error: 'Could not delete user.' });
  });
});

module.exports = router;
