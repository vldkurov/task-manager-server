const express = require('express');
const router = express.Router();

const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const logout = require("../controllers/auth/logout");
const validate = require("../controllers/auth/validate");
const authMiddleware = require("../middleware/authMiddleware");

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Assuming you are using Express and some form of middleware for authentication
router.get('/validate', authMiddleware, validate);


module.exports = router;
