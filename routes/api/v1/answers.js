'use strict';

const express = require('express');
const router = express.Router();
const answersController = require('../../../controllers/answers');
const auth = require('../../../middlewares/auth');
const pagination = require('../../../middlewares/pagination');

router.post('/:topicId/answers', auth, answersController.create);
router.get('', auth, pagination, answersController.list);
router.get('/:id', auth, answersController.get);
router.put('/:id', auth, answersController.update);
router.delete('/:id', auth, answersController.destroy);

module.exports = router;