const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const leaveTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    maxAllowedDays: {
        type: Number,
        default: 100,
    },


});
const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);

module.exports = LeaveType;