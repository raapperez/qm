'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/users');
const auth = require('../../../middlewares/auth');

router.post('', usersController.create);
router.get('/:id', auth, usersController.get);
router.delete('/:id', auth, usersController.destroy);

module.exports = router;