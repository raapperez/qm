'use strict';

const express = require('express');
const router = express.Router();
const topicsController = require('../../../controllers/topics');
const auth = require('../../../middlewares/auth');
const pagination = require('../../../middlewares/pagination');
const hasPermission = require('../../../middlewares/permission');
const permissions = require('../../../frontend/js/constants/permissions');
const models = require('../../../models');
const {Topic} = models;

router.post('', auth, hasPermission(permissions.CREATE_TOPIC), topicsController.create);
router.get('', auth, hasPermission(permissions.GET_TOPIC), pagination, topicsController.list);
router.get('/:id', auth, hasPermission(permissions.GET_TOPIC, Topic.isOwner), topicsController.get);
router.put('/:id', auth, hasPermission(permissions.UPDATE_TOPIC, Topic.isOwner), topicsController.update);
router.delete('/:id', auth, hasPermission(permissions.DESTROY_TOPIC, Topic.isOwner), topicsController.destroy);

module.exports = router;