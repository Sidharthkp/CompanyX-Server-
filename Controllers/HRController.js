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
        }).then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}

module.exports.userSalaryEdit = async (req, res) => {
    try {
        await UserModel.findOneAndUpdate({_id: req.body.id, "salaryStructure._id": req.body.slip_id}, {
            $set: {
                "salaryStructure.$.basic": req.body.basic,
                "salaryStructure.$.reimbursements": req.body.reimbursements,
                "salaryStructure.$.fixedAllowance": req.body.fixedAllowance,
                "salaryStructure.$.incomeTax": req.body.incomeTax,
                "salaryStructure.$.insurance": req.body.insurance,
                "salaryStructure.$.overTime": req.body.overTime,
                "salaryStructure.$.halfDay": req.body.halfDay,
                "salaryStructure.$.fullDay": req.body.fullDay,
                "salaryStructure.$.CTC": req.body.CTC,
                }
            }
        ).then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}