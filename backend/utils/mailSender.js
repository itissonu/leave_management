const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service:'gmail',
        secure:true,
        auth: {
          user: 'neuzbuddy456@gmail.com',
          pass: 'tngu kscl iyvb nhce',
        },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'https://bluepirateofficial.blogspot.com/2024/05/step-by-step-guide-creating-free.html - soumya ranjan sahu',
      to: email,
      subject: title,
      html: body,
    });
    
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;