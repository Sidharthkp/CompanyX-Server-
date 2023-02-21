const { postBanner, image, getBanner } = require('../Controllers/AdminController');
const { single } = require('../Middlewares/BannerMiddleWare');

const router = require('express').Router();

router.use("/image", image)

router.get("/getBanner", getBanner)

router.post("/addBanner", single, postBanner)

module.exports = router;