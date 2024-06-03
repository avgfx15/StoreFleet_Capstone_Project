import UserModel from "./user.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

// $ Create New User Repo
export const createNewUserRepo = async (user) => {

  return await new UserModel(user).save();
};

// $ Find User Repo
export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

// $ FindUser For Password reset Repo
export const findUserForPasswordResetRepo = async (hashtoken) => {
  console.log(hashtoken);
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

// $ Update User Profile Repo
export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

// $ Get All Users Repo
export const getAllUsersRepo = async () => {
  return UserModel.find({});
};


// $ Delete User Repo
export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};


// $ Update User Role and Profile Repo
export const updateUserRoleAndProfileRepo = async (_id, data) => {
  // Write your code here for updating the roles of other users by admin
  return await UserModel.findByIdAndUpdate(_id, data, { new: true });
};
