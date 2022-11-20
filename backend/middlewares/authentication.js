const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const trycatch = require('../utils/trycatch');
const AppError = require('../utils/appError');
const config = require('../config');

const protect = trycatch(async (req, res, next) => {
  let token;
  if (req.cookies.user) {
    token = JSON.parse(req.cookies.user).token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Empty authorization token.', 404));
  }
  // 驗證JWT令牌是否有效
  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

  //  1)用戶在登入後刪除帳號=>確認資料庫是否還能查到該用戶ID
  const currentUser = await User.findById(decoded.id).select('-password -__v');
  if (!currentUser) {
    return next(new AppError("Account doesn't exist.", 404));
  }
  //  2)確認用戶是否有更改密碼:資料庫內更改密碼的時間(passwordChangedAt)在令牌生成的時間點之後(decoded.iat)代表改過密碼
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(new AppError('User recently changed password! Please login again.', 401));
  //   }
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // restrictTo('admin','lead-guide'). role='user'
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

// 沒經過router所以沒辦法用到globalError
const socketProtect = async (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);
    socket.user = decoded;
  } catch (error) {
    next(new AppError('Expired Token. Please login again.', 401));
  }

  next();
};

module.exports = { protect, restrictTo, socketProtect };
