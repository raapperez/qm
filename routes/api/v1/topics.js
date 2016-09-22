'use strict';

const express = require('express');
const router = express.Router();
const topicsController = require('../../../controllers/topics');
const auth = require('../../../middlewares/auth');
const pagination = require('../../../middlewares/pagination');

router.post('', auth, topicsController.create);
router.get('', auth, pagination, topicsController.list);
router.get('/:id', auth, topicsController.get);
router.put('/:id', auth, topicsController.update);
router.delete('/:id', auth, topicsController.destroy);

module.exports = router;