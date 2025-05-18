const { logger } = require("sequelize/lib/utils/logger");
const {encryptedData} = require("../../common/utils");
const db = require("../modal/index")

exports.addUser = async (formData) => {
  try {

    const whereClause = {
      email: formData.email,
    };
    console.log("==db.User===", db.User);

    const checkExistingUser = await db.User.findOne({ where: whereClause });
    console.log("==checkExistingUser==",checkExistingUser);
    
    if (checkExistingUser) {
      return { userExists: true };
    }

    formData.firstName = formData?.first_name;
    formData.lastName = formData?.last_name;

    if (!formData.password) {
      throw new Error("Password is required to create a user");
    }
console.log("===formData===",formData);

    const hashedPassword = await encryptedData(formData.password);
    console.log("==hashedPassword==",hashedPassword);
    
    formData.password = hashedPassword;

    const newUser = await db.User.create(formData);
    return newUser;

  } catch (error) {
    console.error("❌ Error while adding user:", error);
    throw error;
  }
};


exports.findUsers = async () => {
  try {

    const getAllUsers = await db.User.findAll();
    console.log("==getAllUsers==",getAllUsers);

    if(!getAllUsers){
      return {
        userNotExists: true
      }
    }
    return getAllUsers;

  } catch (error) {
    console.error("❌ Error while adding user:", error);
    throw error;
  }
};


exports.updateUsers = async (formData, id) => {
  try {
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };

    const [updatedCount, updatedRows] = await db.User.update(updateData, {
      where: { id },
      returning: true
    });

    if (updatedCount === 0) {
      return null;
    }

    return updatedRows[0];
  } catch (error) {
    console.error("❌ Error while updating user:", error);
    throw error;
  }
};

exports.destroyUsers = async (id) => {
  try {
    const user = await db.User.findByPk(id);

    if (!user) {
      return null;
    }

    const deletedRowCount = await db.User.destroy({
      where: { id }
    });

    return deletedRowCount > 0 ? user : null;
  } catch (error) {
    console.error("❌ Error while deleting user:", error);
    throw error;
  }
};