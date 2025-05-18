const express = require("express");
const router = express.Router();
const { userSignUp } = require("../controller/userController");
const { getUsers } = require("../controller/userController");
const { editUsers } = require("../controller/userController");
const { deleteUsers } = require("../controller/userController");

router.post("/user-registartion", userSignUp);
router.get("/find-users", getUsers);
router.put("/update-user/:id", editUsers);
router.delete("/delete-user/:id", deleteUsers);

module.exports = router;