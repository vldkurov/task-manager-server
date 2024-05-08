const express = require('express');
const router = express.Router();

const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const logout = require("../controllers/auth/logout");
const validate = require("../controllers/auth/validate");
const authMiddleware = require("../middleware/authMiddleware");

// POST signup a new user
router.post('/signup', signup);

// POST login user
router.post('/login', login);

// POST logout user
router.post('/logout', logout);

// GET validate user
router.get('/validate', authMiddleware, validate);


module.exports = router;
