'use strict';

const express = require('express');
const router = express.Router();
const answersController = require('../../../controllers/answers');
const auth = require('../../../middlewares/auth');
const hasPermission = require('../../../middlewares/permission');
const permissions = require('../../../frontend/js/constants/permissions');
const models = require('../../../models');
const {Answer} = models;

router.post('/:topicId/answers', auth, hasPermission(permissions.CREATE_ANSWER), answersController.create);
router.get('/:topicId/answers/:id', auth, hasPermission(permissions.GET_ANSWER, Answer.isOwner), answersController.get);
router.put('/:topicId/answers/:id', auth, hasPermission(permissions.UPDATE_ANSWER, Answer.isOwner), answersController.update);
router.delete('/:topicId/answers/:id', auth, hasPermission(permissions.DESTROY_ANSWER, Answer.isOwner), answersController.destroy);

module.exports = router;