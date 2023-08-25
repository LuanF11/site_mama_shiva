const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// GET '/' -> indexController.index()
router.get('/', indexController.index);
router.get('/login', indexController.login);


module.exports = router;
