const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide your username.'],
      minLength: [3, 'Must between 3 and 12 characters long'],
      maxLength: [12, 'Must between 3 and 12 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'Email already exists.'],
      validate: [validator.isEmail, 'Please check again your email'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide your password.'],
      minLength: [6, "Password can't less than 6 character"],
      trim: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    image: {
      type: String,
      default: '',
    },

    friends: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  { timestamps: true, select: false }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // mongoose:Document.prototype.isModified() 送進來的資料password有異動就會回傳true
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // 密碼確認且加密完就不需要這個ㄌ
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.signToken = function () {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

userSchema.methods.sentData = function (token) {
  const sentData = this.toObject();
  if (token) {
    sentData.token = token;
  }
  delete sentData.password;
  delete sentData.createdAt;
  delete sentData.updatedAt;
  delete sentData.__v;
  return sentData;
};

module.exports = mongoose.model('User', userSchema);
