const express = require('express')
const {verify} = require('../controllers/admin');
const router = express.Router();

router.post('/', verify)

module.exports = router