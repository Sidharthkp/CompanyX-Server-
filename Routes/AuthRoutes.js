const { register, login, google } = require('../Controllers/AuthControllers');
const { checkUser } = require("../Middlewares/AuthMiddlewares")
const router = require('express').Router();

router.post("/", checkUser)
router.post("/google", google)
router.post("/register", register);
router.post("/login", login);

module.exports = router;