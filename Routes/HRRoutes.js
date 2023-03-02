const { userList, userDetails, userSalarySet, userSalaryEdit } = require('../Controllers/HRController');

const router = require('express').Router();

router.get("/getUsers", userList);

router.get("/getUserDetails", userDetails);

router.post("/userSalarySet", userSalarySet);

router.post("/userSalaryEdit", userSalaryEdit);

module.exports = router;