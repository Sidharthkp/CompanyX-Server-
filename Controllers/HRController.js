const UserModel = require("../Models/UserModel");

module.exports.userList = async (req, res, next) => {
    try {
        await UserModel.find()
            .then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}