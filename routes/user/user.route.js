const express = require('express');
const { createUser, loginUser } = require('../../controller/user.controller');
const validateToken = require('../../middleware/token.middleware');

const router = express.Router();

router.post('/create', createUser);
router.post('/login', [validateToken], loginUser);

module.exports = router;