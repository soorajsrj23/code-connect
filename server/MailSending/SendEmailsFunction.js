// EmailSender.js

const nodemailer = require('nodemailer');

const sendEmail = async (subject, email, htmlData, callback) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: '*******',
        pass: '*********'
      }
    });

    const mailOptions = {
      from: 'srjdev019@gmail.com',
      to: email,
      subject,
      html: htmlData,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
        callback(error);
      } else {
        console.log("Email sent:" + info.response);
        callback(null, info);
      }
    });
  } catch (error) {
    console.log("Error" + error);
    callback(error);
  }
};

module.exports = sendEmail;
