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

module.exports.userSalarySet = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.body.id, {
            $push: {
                salaryStructure: {
                    basic: req.body.basic,
                    reimbursements: req.body.reimbursements,
                    fixedAllowance: req.body.fixedAllowance,
                    incomeTax: req.body.incomeTax,
                    insurance: req.body.insurance,
                    overTime: req.body.overTime,
                    halfDay: req.body.halfDay,
                    fullDay: req.body.fullDay,
                    CTC: req.body.CTC,
                    timeStamps: new Date()
                }
            }
        })
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}