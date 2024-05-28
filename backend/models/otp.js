const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');



const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="text-align: center; color: #333;">Verify Your Email</h2>
                <p style="font-size: 16px; color: #555;">Hello,</p>
                <p style="font-size: 16px; color: #555;">Thank you for registering with us. Please use the following OTP to verify your email address:</p>
                <p style="font-size: 24px; text-align: center; color: #4CAF50; font-weight: bold; margin: 20px 0;">${otp}</p>
                <p style="font-size: 16px; color: #555;">This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
                <p style="font-size: 16px; color: #555;">Best regards,</p>
                <p style="font-size: 16px; color: #555;">The Team</p>
                <p style="font-size: 16px; color: #555;">HyScaler pvt.</p>
            </div>
            `
        );

    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}
otpSchema.pre("save", async function (next) {

    // will be send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});
const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;