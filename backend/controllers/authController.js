const trycatch = require('../utils/trycatch');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.register = trycatch(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  const token = newUser.signToken();

  res.status(201).json({
    status: 'success',
    user: newUser.sentData(token),
  });
});
exports.login = trycatch(async (req, res, next) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email })
    .select('+password')
    .populate('friends', '_id username email image');
  if (!oldUser) {
    return next(new AppError("Account doesn't exist.", 404));
  } else if (!(await oldUser.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 400));
  }

  const token = oldUser.signToken();

  res.status(200).json({
    status: 'success',
    user: oldUser.sentData(token),
  });
});

exports.logout = trycatch(async (req, res) => {
  req.user = null;
  if (req.cookies) {
    res.clearCookie('user');
  }
  res.status(200).json({
    status: 'success',
  });
});
