const { userList, userDetails, userSalarySet } = require('../Controllers/HRController');

const router = require('express').Router();

router.get("/getUsers", userList);

router.get("/getUserDetails", userDetails);

router.post("/userSalarySet", userSalarySet);

module.exports = router;