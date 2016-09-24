'use strict';

const express = require('express');
const router = express.Router();
const answersController = require('../../../controllers/answers');
const auth = require('../../../middlewares/auth');
const pagination = require('../../../middlewares/pagination');

router.post('/:topicId/answers', auth, answersController.create);
router.get('/:topicId/answers', auth, pagination, answersController.list);
router.get('/:topicId/answers/:id', auth, answersController.get);
router.put('/:topicId/answers/:id', auth, answersController.update);
router.delete('/:topicId/answers/:id', auth, answersController.destroy);

module.exports = router;