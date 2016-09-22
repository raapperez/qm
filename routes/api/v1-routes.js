'use strict';

const express = require('express');
const router = express.Router();
const authRoutes = require('./v1/auth');
const usersRoutes = require('./v1/users');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

module.exports = router;