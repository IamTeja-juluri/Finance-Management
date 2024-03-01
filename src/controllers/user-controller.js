const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const { User, Token } = require("../models");
const {
  SuccessResponse,
  ErrorResponse,
  SendEmail,
} = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { ServerConfig } = require("../config");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const { fileSizeFormatter } = require("../utils/common/fileUpload");
const { sendOtp, verifyOtp } = require("../utils/common/otpService");

const generateToken = (id) => {
  return jwt.sign({ id }, ServerConfig.JWT_SECRET, { expiresIn: "1d" });
};

async function createUser(req, res) {
  try {
    const { email, userpassword, confirmPassword, phone } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      throw new AppError(
        `User with email ${email} is already in use`,
        StatusCodes.CONFLICT
      );
    const phoneNumberExists = await User.findOne({ phone });
    if (phoneNumberExists && phoneNumberExists.phone === phone)
      throw new AppError(
        `User with mobileNumber ${phone} is already in use`,
        StatusCodes.CONFLICT
      );
    if (userpassword !== confirmPassword)
      throw new Error("Passwords do not match", StatusCodes.BAD_REQUEST);

    const otp = sendOtp(req);
    const something= verifyOtp(otp)
    const user = await UserService.createUser({
      ...req.body,
      password: userpassword,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function userInfo(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id }).select(
      "-password -createdAt -updatedAt -__v -_id"
    );
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function loginUser(req, res) {
  try {
    const { email, userpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      throw new AppError(
        `User with ${email} doesnt exist,please sign in`,
        StatusCodes.BAD_REQUEST
      );
    const isPasswordCorrect = await bcrypt.compare(userpassword, user.password);
    if (!isPasswordCorrect)
      throw new AppError(
        `Wrong Password,Please try again`,
        StatusCodes.BAD_REQUEST
      );
    const token = generateToken(user._id);
    await Token.create({
      userId: user._id,
      token: token,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 1000 * 24 * 60 * 60),
    });
    req.user = user;
    req.user.token = token;
    const { password, __v, ...sanitizedData } = user._doc;
    SuccessResponse.data = sanitizedData;
    SuccessResponse.data.accessToken = token;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenExists = await Token.findOneAndDelete({ token: token });
    if (!tokenExists)
      throw new AppError("Invalid Token", StatusCodes.BAD_REQUEST);
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    SuccessResponse.data = "Successfully logged out";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await UserService.getUser({ email: email });
    if (!user)
      throw new AppError(
        `User with ${email} doesn't exist,please provide valid email`,
        StatusCodes.NOT_FOUND
      );
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 60 * 1000,
    }).save();
    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/user/resetpassword/${resetToken}`;
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>You requested for a password reset</p>
        <p>Click on the link below to change your password</p>
        <p>The reset link is valid only for 30 minutes</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards.....</p>
        <p>bookmark-club.com Team</p> 
        `;
    const subject = "Password Reset Request";
    const sendTo = user.email;
    const sendFrom = process.env.EMAIL_USER;
    await SendEmail(subject, message, sendTo, sendFrom);
    SuccessResponse.data = "Reset email sent";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      throw new AppError(
        `User not found,Please signup`,
        StatusCodes.BAD_REQUEST
      );
    const { oldPassword, newPassword } = req.body;
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (user && isPasswordCorrect) {
      user.password = newPassword;
      await user.save();
      SuccessResponse.data = "Password changed successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } else
      throw new AppError("Old password is incorrect", StatusCodes.BAD_REQUEST);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function resetPassword(req, res) {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    const { resetToken } = req.params;
    if (newPassword !== confirmNewPassword)
      throw new AppError(
        "Two passwords are not matching",
        StatusCodes.BAD_REQUEST
      );
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: {
        $gt: Date.now(),
      },
    });
    if (!userToken)
      throw new AppError("Invalid or expired token", StatusCodes.NOT_FOUND);
    const user = await User.findOne({ _id: userToken.userId });
    user.password = newPassword;
    await user.save();
    SuccessResponse.data = "Password reset successfull.Please login now";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateUserProfile(req, res) {
  try {
    const updatedUserProfile = await User.findByIdAndUpdate(
      { _id: req.user._id },
      ...req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -createdAt -updatedAt -__v -_id");
    SuccessResponse.data = updatedUserProfile;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateUserProfilePicture(req, res) {
  try {
    let fileData = {};
    if (req.file) {
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "usersProfilePictures",
          resource_type: "image",
        });
      } catch (error) {
        throw new AppError(
          "Image could not be uploaded",
          StatusCodes.EXPECTATION_FAILED
        );
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
    const updatedUserProfile = await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        image: fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");
    SuccessResponse.data = updatedUserProfile;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function removeFriend(req, res) {
  try {
    const response = await UserService.removeFriend(req);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
  }
}
module.exports = {
  createUser,
  loginUser,
  userInfo,
  logout,
  forgotPassword,
  changePassword,
  resetPassword,
  updateUserProfile,
  updateUserProfilePicture,
  removeFriend,
};
