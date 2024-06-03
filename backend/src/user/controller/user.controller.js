// Please don't change the pre-written code
// Import the necessary modules here
import { sendPasswordResetEmail } from "../../../utils/emails/passwordReset.js";
import { sendWelcomeEmail } from "../../../utils/emails/welcomeMail.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { sendToken } from "../../../utils/sendToken.js";
import {
  createNewUserRepo,
  deleteUserRepo,
  findUserForPasswordResetRepo,
  findUserRepo,
  getAllUsersRepo,
  updateUserProfileRepo,
  updateUserRoleAndProfileRepo,
} from "../models/user.repository.js";
import crypto from "crypto";




// $ Create New User
export const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await createNewUserRepo(req.body);
    await sendToken(newUser, res, 200);

    // Implement sendWelcomeEmail function to send welcome message
    await sendWelcomeEmail(newUser);
  } catch (err) {
    //  handle error for duplicate email
    if (err.name === "MongoServerError" || err.code === 11000) {
      return next(new ErrorHandler(201, "email already register"));
    } else {
      return next(new ErrorHandler(400, err));
    }
  }
};

// $ User Login
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(400, "please enter email/password"));
    }
    const user = await findUserRepo({ email }, true);
    if (!user) {
      return next(
        new ErrorHandler(401, "user not found! register yourself now!!")
      );
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Invalid email or passswor!"));
    }
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ Logout User
export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

// $ Forget Password
export const forgetPassword = async (req, res, next) => {
  // Implement feature for forget password
  try {
    const { email } = req.body;
    const factor = { email };
    const findUser = await findUserRepo(factor);
    const resetPasswordToken = await findUser.getResetPasswordToken();
    await findUser.save();
    const resetPasswordUrl = `http://localhost:3000/api/storefleet/user/password/reset/${resetPasswordToken}`

    await sendPasswordResetEmail(findUser, resetPasswordUrl);
    return res.status(200).json({ message: "Password reset link sent by mail", success: true })
  } catch (err) {
    console.log(err.message);
    return next(new ErrorHandler(500, err));
  }
};

// $ Reset Password With resetPasswordToken With Crypto
export const resetUserPassword = async (req, res, next) => {
  // Implement feature for reset password

  const token = req.params.token;

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const findUser = await findUserForPasswordResetRepo(hashToken);

  if (!findUser) {
    return res.status(400).json({ message: "Invalid token", success: false });
  }

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(201).json({ message: "Password and confirmPassword not matched" })
  } else {
    findUser.password = password;
    // Remove the token from the database so it can no longer be used to update the user
    findUser.resetPasswordToken = undefined;
    findUser.resetPasswordExpire = undefined;
    await findUser.save();
  }

  // // Return a success response
  res.status(200).json({ message: "Password reset successfully", success: true });

};

// $ Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.user._id });
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// $ Update Password

export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!currentPassword) {
      return next(new ErrorHandler(401, "pls enter current password"));
    }

    const user = await findUserRepo({ _id: req.user._id }, true);
    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Incorrect current password!"));
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return next(
        new ErrorHandler(401, "mismatch new password and confirm password!")
      );
    }

    user.password = newPassword;
    await user.save();
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ Update User Profile
export const updateUserProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUserDetails = await updateUserProfileRepo(req.user._id, {
      name,
      email,
    });
    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ admin controllers
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// $ Get User Details For Admin
export const getUserDetailsForAdmin = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.params.id });
    if (!userDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// $ Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserRepo(req.params.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }

    res
      .status(200)
      .json({ success: true, msg: "user deleted successfully", deletedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ Update User Profle and Role
export const updateUserProfileAndRole = async (req, res, next) => {
  // Write your code here for updating the roles of other users by admin
  try {
    const loggedUser = req.user;
    console.log("Function call");
    if (loggedUser.role === "admin") {
      const _id = req.params.id;
      const { name, email, role } = req.body;
      const updateData = { name, email, role };
      const updateUser = await updateUserRoleAndProfileRepo(_id, updateData)

      return res
        .status(200)
        .json({ success: true, msg: "user data updated successfully", updateUser });
    } else {
      return next(new ErrorHandler(403, `user not allow to perform`));
    }

  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};
