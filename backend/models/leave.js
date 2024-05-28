const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveRequestSchema = new Schema({
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leaveType: {
      type: Schema.Types.ObjectId,
      ref: 'LeaveType', 
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    managerComments: {
      type: String,
    },
    deleted:{
      type: String,
      default:false
    }
  });
  
  const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
  
  module.exports = LeaveRequest;
  