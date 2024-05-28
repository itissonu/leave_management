const express = require('express');
const { createLeaveType, getAllLeaveTypes, updateLeaveType, deleteLeaveType } = require('../controller/leaveTypeController');

const router = express.Router()

router.post('/create',createLeaveType)
router.get('/getalltypes',getAllLeaveTypes)
router.put('/update/:id',updateLeaveType)
router.delete('/delete/:id',deleteLeaveType)

module.exports = router;