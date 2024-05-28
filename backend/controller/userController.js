const LeaveType = require("../models/leavetype");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const generateAuthToken = require("../utils/jwttoken");
const OTP = require("../models/otp");
const otpGenerator = require('otp-generator');


const userRegister = async (req, res) => {
    const { name, email, password, phone, profilePicture } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const leaveTypes = await LeaveType.find();

        const leaveBalances = leaveTypes.map(leaveType => ({
            leaveType: leaveType._id,
            balance: leaveType.maxAllowedDays,

        }));

        const newUser = new User({
            name,
            email,
            password: hashedPassword,

            phone,
            profilePicture,
            leaveBalances
        });

        await newUser.save();

        const token = await generateAuthToken(newUser);

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(201).json({
            success: true,
            message: "Registration done",
            user: newUser
            , token,
        });


    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }

}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('leaveBalances.leaveType');
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid  password' });
        }
        const token = await generateAuthToken(user);

        res.cookie("token", token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(201).json({
            success: true,
            message: "Login Success",
            user: user
            , token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


const userVerify = async (req, res) => {
    const { email } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        res.status(201).json({
            success: true,
            message: "User Verified",

        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).populate('managerId').populate('leaveBalances.leaveType');
        if (!user) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
};


const getAllEmployees = async (req, res) => {
    try {

        const employees = await User.find({ role: 'employee' }).populate('leaveBalances.leaveType');

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};


const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        let otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(4, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }

};
const OTPverificationUser = async (req, res, next) => {
    try {
        const otp = req.body.otp;

        const response = await OTP.find({ otp: otp }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {

            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });

        }
        res.status(201).status(200).json({
            success: true,
            message: "OTP Verified"
        })

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).populate('leaveBalances.leaveType');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};
const Logout = async (req, res) => {

    try {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        res.status(200).json({
            success: true,
            message: "logged out",
        })

    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });

    }
}

module.exports = { userRegister, sendOTP, OTPverificationUser, userVerify, userLogin, getEmployeeById, getAllEmployees,updateUser,Logout }