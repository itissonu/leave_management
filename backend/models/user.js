
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['employee', 'manager'],
        default: 'employee',
    },

    managerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    leaveBalances: [{
        leaveType: {
          type: Schema.Types.ObjectId,
          ref: 'LeaveType',
        },
        balance: {
          type: Number,
          default: 0,
        },
      }],

    phone: String,

    profilePicture: String,

    status: {
        type: String,
        enum: ['active', 'inactive', 'on leave'],
        default: 'active',
    },

});
const User = mongoose.model('User', userSchema);

module.exports = User;