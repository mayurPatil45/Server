const express = require('express')
const { registerUser, getRegisteredUsers, createAmbassador } = require('../controllers/user');
const { route } = require('./leaderboard.route');

const router = express.Router();

router.get('/', getRegisteredUsers)
router.post('/register', registerUser);
router.post('/ambassador/create', createAmbassador)

module.exports = router;