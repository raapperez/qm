'use strict';

const express = require('express');
const router = express.Router();
const authRoutes = require('./v1/auth');
const usersRoutes = require('./v1/users');
const topicsRoutes = require('./v1/topics');
const answersRoutes = require('./v1/answers');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/topics', topicsRoutes);
router.use('/topics/:topicId/answers', answersRoutes);

module.exports = router;