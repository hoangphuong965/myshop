const User = require("../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validateAuth = require("../utils/validateAuth");
const sendEmail = require("../utils/sendMail");

exports.registerService = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await User.findOne({ email: userInfo.email }).exec();
      let checkEmail = await validateAuth.emailValidate(userInfo.email);
      let checkPassWord = await validateAuth.passwordValidate(
        userInfo.password
      );

      // validate
      // if (checkEmail || checkPassWord) {
      //   resolve({
      //     checkPassWord,
      //     checkEmail,
      //   });
      // }

      if (check) {
        resolve({
          errCode: 1,
          errMessage: "Email is in use. Try another email",
        });
      } else {
        const avatar = await gravatar.url(userInfo.email, {
          s: "200",
          r: "pg",
          d: "404",
        });

        if (!userInfo.email || !userInfo.name || !userInfo.password) {
          resolve({
            errCode: 1,
            errMessage: "Please, enter full filed.",
          });
        } else {
          // create user
          const password = await hashPassword(userInfo.password);
          const user = await User.create({
            email: userInfo.email,
            name: userInfo.name,
            password,
            avatar,
          });
          const token_user = await getjwttoken(user._id);
          resolve({
            errCode: 0,
            message: "Register Successfully",
            token_user,
            role: user.role,
            success: true,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.loginService = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: userInfo.email })
        .select("+password")
        .exec();
      if (!userInfo.email || !userInfo.password) {
        resolve({
          errCode: 1,
          errMessage: "Please, enter full your email and password.",
          success: false,
        });
      }
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "Invalid password or email",
          success: false,
        });
      }
      const isPasswordMatched = await compparePassword(
        userInfo.password,
        user.password
      );
      if (!isPasswordMatched) {
        resolve({
          errCode: 1,
          errMessage: "Invalid password or email",
          success: false,
        });
      } else {
        const token_user = await getjwttoken(user._id);
        resolve({
          errCode: 0,
          message: "Login Successfully",
          token_user,
          role: user.role,
          success: true,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.forgotPasswordService = (userInfo, http, host) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ email: userInfo.email }).exec();
      if (!user) {
        resolve({
          errCode: 1,
          message: "Email not found",
        });
      } else {
        // get reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        // hash and set to resetpass
        user.resetPasswordToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");
        // set token expire time
        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        // create reset password url
        const resetUrl = `${http}://${host}/api/v1/password/update/${resetToken}`;
        // const resetUrl = `${process.env.FRONTEND_URL}/password/update/${resetToken}`;
        const message = `your password reset token is: ${resetUrl}`;

        try {
          await sendEmail({
            email: user.email,
            subject: "myshop",
            message,
          });
          resolve({
            errCode: 0,
            message: `Email sent to ${user.email}`,
          });
        } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save({ validateBeforeSave: false });
          resolve({
            errCode: 2,
            message: error,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.updatePasswordService = (newPassword, yourToken, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resetPasswordToken = await passwordToken(yourToken);
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: "Password reset token is invalid or has been expired",
        });
      } else {
        const password = await hashPassword(newPassword);
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        resolve({
          message: "Updated new password",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.getUserProfileService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        resolve({
          errCode: 1,
          message: "user not found",
        });
      } else {
        resolve({
          user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.changePasswordService = (id, oldPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id).select().select("+password").exec();
      const password = await hashPassword(newPassword);
      const checkOldPassWord = await compparePassword(
        oldPassword,
        user.password
      );
      if (!checkOldPassWord) {
        resolve({
          errCode: 1,
          message: "Entered wrong old password. Try again",
          success: false,
        });
      } else {
        user.password = password;
        user.save();
        const token_user = await getjwttoken(user._id);
        resolve({
          errCode: 0,
          success: true,
          token_user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateProfileService = (id, newUserData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        resolve({
          errCode: 1,
          message: "User not found",
        });
      } else {
        user.name = newUserData.name ? newUserData.name : user.name;
        user.email = newUserData.email ? newUserData.email : user.email;
        user.save();
        resolve({
          errCode: 0,
          message: "Update user info successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ===============================================

const getjwttoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const compparePassword = async (enteredPassword, password) => {
  return await bcrypt.compare(enteredPassword, password);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

const passwordToken = async (yourToken) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(yourToken)
    .digest("hex");
  return resetPasswordToken;
};

// ==================ADMIN=========================

exports.getAllUsersService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find();
      resolve({
        errCode: 0,
        users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.getUserDetailsService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        resolve({
          errCode: 1,
          message: "Not found user",
        });
      } else {
        resolve({
          errCode: 0,
          user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateUserService = (id, newUserData) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findById(id);
    if (!user) {
      resolve({
        errCode: 1,
        message: "Not found user",
      });
    } else {
      user.role = newUserData.role ? newUserData.role : user.role;
      user.save();
      resolve({
        errCode: 0,
        message: "Update user successfully",
      });
    }
  });
};

exports.deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      resolve({
        errCode: 1,
        message: "Not found user",
      });
    } else {
      resolve({
        errCode: 0,
        message: "Delete user successfully",
      });
    }
  });
};
