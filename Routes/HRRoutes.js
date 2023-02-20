const { userList } = require('../Controllers/HRController');

const router = require('express').Router();

router.get("/getUsers", userList);

module.exports = router;