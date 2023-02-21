const UserModel = require("../Models/UserModel");

module.exports.getSalarySlip = async (req, res) => {
    try {
        await UserModel.findById(req.body.id)
            .then((data) => res.status(201).json(data.salaryStructure)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}
module.exports.getEmployeeDetails = async (req, res) => {
    try {
        await UserModel.findOne({email: req.body.email})
            .then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}