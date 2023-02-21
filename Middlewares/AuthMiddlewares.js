const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken")

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.json({ status: false });
                next()
            } else {
                const user = await User.findById(decodedToken.id)
                if (user) res.json({ status: true, user: user.email, role: user.roles })
                else res.json({ status: false });
                next();
            }
        })
    } else {
        req.json({ status: false });
        next()
    }
}