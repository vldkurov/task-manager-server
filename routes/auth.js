const express = require('express');
const router = express.Router();

const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const logout = require("../controllers/auth/logout");

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

module.exports = router;
