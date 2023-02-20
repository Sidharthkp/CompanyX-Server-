const UserModel = require("../Models/UserModel");

module.exports.userList = async (req, res) => {
    try {
        await UserModel.find()
            .then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}

module.exports.userDetails = async (req, res) => {
    try {
        await UserModel.findById(req.query.q)
            .then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}