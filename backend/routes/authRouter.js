const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authentication');
const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

module.exports = router;
