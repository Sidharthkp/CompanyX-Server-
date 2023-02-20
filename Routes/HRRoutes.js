const { userList, userDetails } = require('../Controllers/HRController');

const router = require('express').Router();

router.get("/getUsers", userList);

router.get("/getUserDetails", userDetails);

module.exports = router;