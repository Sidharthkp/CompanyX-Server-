const { postBanner, image } = require('../Controllers/AdminController');
const { single } = require('../Middlewares/BannerMiddleWare');

const router = require('express').Router();

router.use("/image", image)

router.post("/addBanner", single, postBanner)

module.exports = router;