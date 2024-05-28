const LeaveType = require("../models/leavetype");


createLeaveType = async (req, res) => {
    try {
        const { name, maxAllowedDays } = req.body;
        const leaveType = new LeaveType({ name, maxAllowedDays });
        await leaveType.save();
        res.status(201).json({ success: true, message: 'Leave type created successfully', leaveType });
    } catch (error) {
        res.status(500).json({ message: 'Error creating leave type', error });
    }
};


getAllLeaveTypes = async (req, res) => {
    try {
        const leaveTypes = await LeaveType.find();
        res.status(200).json(leaveTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave types', error });
    }
};


updateLeaveType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maxAllowedDays } = req.body;
        const leaveType = await LeaveType.findByIdAndUpdate(id, { name, maxAllowedDays }, { new: true });
        if (!leaveType) {
            return res.status(404).json({ success: false, message: 'Leave type not found' });
        }
        res.status(200).json({ success: true, message: 'Leave type updated successfully', leaveType });
    } catch (error) {
        res.status(500).json({ message: 'Error updating leave type', error });
    }
};


deleteLeaveType = async (req, res) => {
    try {
        const { id } = req.params;
        const leaveType = await LeaveType.findByIdAndDelete(id);
        if (!leaveType) {
            return res.status(404).json({ success: false, message: 'Leave type not found' });
        }
        res.status(200).json({ success: true, message: 'Leave type deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting leave type', error });
    }
};

module.exports = { createLeaveType, getAllLeaveTypes, updateLeaveType, deleteLeaveType }
