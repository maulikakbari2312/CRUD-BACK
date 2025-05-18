const { addUser, findUsers, updateUsers, destroyUsers } = require("../service/user.service");
const handleResponse = require("../../helper/responseHandler");
const { logger } = require("sequelize/lib/utils/logger");

exports.userSignUp = async (req, res, next) => {
  try {
    const formData = req.body;
    const createUser = await addUser(formData);
    let response;
    if (createUser.userExists) {
      response = handleResponse(409, "user with this Email already exists", 0);
    } else {
      response = handleResponse(200, "user Created Successfully", createUser);
    }
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const getAllUsers = await findUsers();
    let response;
    if (getAllUsers.userNotExists) {
      response = handleResponse(404, "user Not Found", []);
    } else {
      response = handleResponse(200, "users fetched Successfully", getAllUsers);
    }
    return res.status(response.status).json(response);
  } catch (error) {
    // logger.error("Error in User Sign-up ");
    next(error);
  }
};

exports.editUsers = async (req, res, next) => {
  try {
    const formData = req.body;
    const id = req.params.id;

    const updatedUser = await updateUsers(formData, id);

    let response;
    if (!updatedUser) {
      response = handleResponse(404, "User Not Found", []);
    } else {
      response = handleResponse(200, "User Updated Successfully", updatedUser);
    }

    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in editUsers controller:", error);
    next(error);
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await destroyUsers(userId);

    if (!deletedUser) {
      return res.status(404).json(handleResponse(404, "User not found", []));
    }

    return res.status(200).json(handleResponse(200, "User deleted successfully", deletedUser));
  } catch (error) {
    next(error);
  }
};