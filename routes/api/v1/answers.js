'use strict';

const express = require('express');
const router = express.Router();
const answersController = require('../../../controllers/answers');
const auth = require('../../../middlewares/auth');

router.post('', auth, answersController.create);
router.get('/:id', auth, answersController.get);
router.put('/:id', auth, answersController.update);
router.delete('/:id', auth, answersController.destroy);

module.exports = router;