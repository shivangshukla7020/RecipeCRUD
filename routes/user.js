const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Register
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { username, password, fullName, country, dietaryPreference } = req.body;
  try {
    const user = new User({ username, fullName, country, dietaryPreference });
    await User.register(user, password);
    res.redirect('/login');
  } catch (e) {
    res.redirect('/register');
  }
});

// Login
router.get('/login', (req, res) => res.render('login'));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/recipes',
  failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;
