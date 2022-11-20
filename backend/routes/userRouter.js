const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authentication');
const router = express.Router();

router.use(protect);
router.route('/userUpdated').post(userController.userUpdated);
router.route('/inviteFriend').post(userController.inviteUser);
router.route('/acceptInvite').post(userController.acceptInvite);
router.route('/rejectInvite').post(userController.rejectInvite);

module.exports = router;
