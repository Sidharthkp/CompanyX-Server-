const { postBanner, image, getBanner, deleteBanner } = require('../Controllers/AdminController');
const { single } = require('../Middlewares/BannerMiddleWare');

const router = require('express').Router();

router.use("/image", image)

router.get("/getBanner", getBanner)

router.post("/addBanner", single, postBanner)

router.post("/deleteBanner", deleteBanner)

module.exports = router;