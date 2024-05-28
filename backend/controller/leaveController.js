
const LeaveRequest = require('../models/leave');
const User = require('../models/user');


const submitLeaveRequest = async (req, res) => {
    try {
        const employeeId = req.user?._id
        const { leaveType, startDate, endDate, reason } = req.body;


        if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }


        const employee = await User.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }


        const leaveRequest = new LeaveRequest({
            employeeId,
            leaveType,
            startDate,
            endDate,
            reason,

        });

        await leaveRequest.save();
        res.status(201).json({ success: true, message: 'Leave request submitted successfully', leaveRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error submitting leave request', error: error.message });
    }
};



const getLeaveForEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const leaveRequests = await LeaveRequest.find({ employeeId }).populate('leaveType');
        if (leaveRequests.length === 0) {
            return res.status(200).json({ leaveRequests, message: "No Request found" });
        }
        res.status(200).json({success:true,leaveRequests,message:"goy all"});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave requests', error: error.message });
    }
};


const getLeaveForManager = async (req, res) => {

    try {
        const { name } = req.query;

        const query = { };
        if (name) {

            query['employeeId.name'] = { $regex: new RegExp(name, 'i') };
        }

        const leaveRequests = await LeaveRequest.find(query).populate('leaveType').populate('employeeId').sort({ startDate: 1 });

        if (leaveRequests.length === 0) {
            return res.status(200).json({ leaveRequests, message: "No requests found" });
        }

        res.status(200).json({success:true,leaveRequests,message:"got all"});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave requests', error: error.message });
    }
};


const updateLeaveRequest = async (req, res) => {
    try {
        const managerid = req.user?._id
        const { id } = req.params;
        const { status, managerComments } = req.body;

        if (!status || !['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const leaveRequest = await LeaveRequest.findById(id).populate('leaveType').populate('employeeId');
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }
        
        if (leaveRequest.status === 'approved' && status === 'approved') {
            return res.status(400).json({ message: 'Leave request has already been approved' });
        }



        if (status === 'approved') {
            const totaldays = (new Date(leaveRequest.endDate) - new Date(leaveRequest.startDate)) / (1000 * 60 * 60 * 24) + 1;
            const user = await User.findById(leaveRequest.employeeId);
            const leaveBalance = user.leaveBalances.find(balance => balance.leaveType.toString() === leaveRequest.leaveType._id.toString());

            if (!leaveBalance || leaveBalance.balance < totaldays) {
                return res.status(400).json({ success: false, message: 'Insufficient leave balance' });
            }

            leaveBalance.balance = leaveBalance.balance - totaldays;
            await user.save();
        }

        else if (status === 'rejected') {

            if (leaveRequest.status === 'approved') {
                const totalDays = (new Date(leaveRequest.endDate) - new Date(leaveRequest.startDate)) / (1000 * 60 * 60 * 24) + 1;
                const user = await User.findById(leaveRequest.employeeId);
                const leaveBalance = user.leaveBalances.find(balance => balance.leaveType.toString() === leaveRequest.leaveType._id.toString());

                if (leaveBalance) {
                    leaveBalance.balance += totalDays;
                    await user.save();
                }
            }
        }

        leaveRequest.status = status;
        leaveRequest.managerId = managerid

        if (managerComments) {
            leaveRequest.managerComments = managerComments;
        }

        await leaveRequest.save();

        res.status(200).json({
            success: true,
            message: 'Leave request updated successfully',
            leaveRequest
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating leave request', error: error.message });
    }
};
const getAbsentDatesForUser = async (req, res) => {
    try {
        const { userId } = req.params;


        const approvedLeaveRequests = await LeaveRequest.find({ employeeId: userId, status: 'approved' });


        let absentDates = [];
        approvedLeaveRequests.forEach(request => {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);


            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                absentDates.push( {date:(new Date(date).toISOString().split('T')[0]),title:request.reason });
            }
        });

        res.status(200).json({success:true,message:"gotall", absentDates });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching absent dates', error: error.message });
    }
};


module.exports = {
    submitLeaveRequest,
    getLeaveForEmployee,
    getLeaveForManager,
    updateLeaveRequest,
    getAbsentDatesForUser
};
