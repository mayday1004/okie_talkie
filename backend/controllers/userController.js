const trycatch = require('../utils/trycatch');
const cloudinary = require('../utils/couldinary');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Invite = require('../models/inviteModel');
const friendsListHandler = require('../socketio/friendsListHandler');

exports.userUpdated = trycatch(async (req, res, next) => {
  const { _id, username, email, picture, currentPassword, newPassword, newPasswordConfirm } = req.body;
  const oldUser = await User.findById({ _id }).select('+password');

  if (!oldUser) {
    return next(new AppError('Account no longer exist.', 401));
  } else if (!(await oldUser.comparePassword(currentPassword))) {
    return next(new AppError('Incorrect email or password', 400));
  }

  if (picture) {
    const result = await cloudinary.uploader.upload(picture, {
      folder: 'talkie', //存在cloudinary的資料夾名稱
      width: 150,
      crop: 'limit',
    });
    oldUser.image = result.secure_url;
  }

  if (newPassword && newPasswordConfirm) {
    oldUser.password = newPassword;
    oldUser.passwordConfirm = newPasswordConfirm;
    await oldUser.save();
  }

  oldUser.username = username;
  oldUser.email = email;
  const modifiedUser = await oldUser.save({ validateBeforeSave: false });

  const token = modifiedUser.signToken();
  res.status(200).json({
    status: 'success',
    user: modifiedUser.sentData(token),
  });
});

//邀請朋友
exports.inviteUser = trycatch(async (req, res, next) => {
  const { email } = req.body;
  const targetFriend = await User.findOne({ email });
  //確認是否找的到人或是不是已經是朋友了?
  if (!targetFriend) {
    return next(new AppError(`${email} has not been found. Please check again.`, 404));
  } else if (targetFriend.friends.includes(req.user._id)) {
    return next(new AppError('Friend already added. Please check friends list', 409));
  }
  //確認是不是已經送出邀請?
  const isInviteAlreadySent = await Invite.find({
    senderId: req.user._id,
    receiverId: targetFriend._id,
  });

  if (isInviteAlreadySent.length > 0) {
    return next(new AppError('Invitation has been already sent', 409));
  }

  // create new invitation in database
  const newInvitation = await Invite.create({
    senderId: req.user._id,
    receiverId: targetFriend._id,
  });

  //透過socketio將邀請即時傳去給目標用戶
  friendsListHandler.updatePendingInvite(targetFriend._id.toString());

  return res.status(200).json({
    status: 'success',
    message: 'Invitation has been sent',
  });
});

//接受朋友邀請
exports.acceptInvite = trycatch(async (req, res, next) => {
  const invitationId = req.body.id;
  const invitation = await Invite.findById(invitationId);

  if (!invitation) {
    return next(new AppError('Error occured. Please try again', 401));
  }

  // add friends to both users
  const { senderId, receiverId } = invitation;
  await User.findByIdAndUpdate(
    senderId._id,
    {
      $push: { friends: receiverId._id },
    },
    { new: true }
  );
  await User.findByIdAndUpdate(
    receiverId._id,
    {
      $push: { friends: senderId._id },
    },
    { new: true }
  );

  await Invite.findByIdAndDelete(invitationId);

  //透過socketio即時更新邀請列表
  friendsListHandler.updateFriendsList(senderId._id.toString());
  friendsListHandler.updateFriendsList(receiverId._id.toString());
  friendsListHandler.updatePendingInvite(receiverId._id.toString());

  return res.status(200).json({
    status: 'success',
    message: 'Friend successfuly added',
  });
});

//拒絕朋友邀請
exports.rejectInvite = trycatch(async (req, res) => {
  const invitationId = req.body.id;
  await Invite.findByIdAndDelete(invitationId);
  //透過socketio即時更新邀請列表
  friendsListHandler.updatePendingInvite(req.user._id.toString());

  return res.status(200).json({
    status: 'success',
    message: 'Invitation succesfully rejected',
  });
});
