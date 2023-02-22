const { postBanner, image, getBanner, deleteBanner, getSalaryDetails, accessControll } = require('../Controllers/AdminController');
const { single } = require('../Middlewares/BannerMiddleWare');

const router = require('express').Router();

router.use("/image", image)

router.get("/getBanner", getBanner)

router.get("/getSalaryDetails", getSalaryDetails)

router.post("/addBanner", single, postBanner)

router.post("/deleteBanner", deleteBanner)

router.post("/accessControll", accessControll)

module.exports = router;