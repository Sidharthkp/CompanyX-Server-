const { getSalarySlip, getEmployeeDetails } = require('../Controllers/EmployeeController');

const router = require('express').Router();

router.post("/getSalarySlip", getSalarySlip)

router.post("/getEmployeeDetails", getEmployeeDetails)

module.exports = router;