const express = require('express');
const router = express.Router();
const { showAll } = require('../controllers')


router.get('/', showAll)

module.exports = router;