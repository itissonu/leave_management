const express = require('express');
const { submitLeaveRequest, getLeaveForEmployee, getLeaveForManager, updateLeaveRequest, getAbsentDatesForUser } = require('../controller/leaveController');
const { isAuthenticate } = require('../middleware/Authentication');


const router = express.Router()

router.post('/submit',isAuthenticate, submitLeaveRequest);


router.get('/employee/:employeeId', getLeaveForEmployee);


router.get('/manager', getLeaveForManager);


router.put('/update/:id',isAuthenticate, updateLeaveRequest);


router.get('/absent-dates/:userId', getAbsentDatesForUser);

module.exports = router;