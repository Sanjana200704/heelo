const express = require('express');
const { body, validationResult } = require('express-validator'); // For input validation
const User = require('../models/User.js'); // Your User model
const jwt = require('jsonwebtoken'); // For token generation
const router = express.Router();

// Register route
router.post(
  '/register',
  [
    // Validation middleware
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // console.log(email,password)

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      // console.log(user)
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user (password will be hashed automatically in the User model)
      const result = await User.create({ email, password });
      // user = new User({ email, password });
      // await user.save();
      // console.log(result)


      // Generate JWT
      const payload = { password: result.password, email: result.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '10d' });

      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    // Validation middleware
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email,password)

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if the password matches (assuming you have a matchPassword method)
      const isMatch = await user.matchPassword(password); // Ensure this method is defined in your User model
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      console.log(isMatch)

      // Generate JWT
      const payload = { password: user.password, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });

      res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
        // sameSite: 'strict', // Prevents CSRF attacks by restricting cross-site cookies
        maxAge: 3600000, // 1 hour in milliseconds
      });

      // res.cookie()
      console.log('Set-Cookie header:', res.getHeaders()['set-cookie']);



      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
