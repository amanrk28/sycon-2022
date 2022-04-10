const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const renderHtml = require('./emailTemplate.js');
admin.initializeApp();

const SENDER_EMAIL = 'ssnsycon2022@gmail.com';
const SENDER_PASS = 'lapohoadtwxhxjbf';

exports.sendEmailForRegistration = functions.https.onCall((data, context) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASS,
    },
  });
  const makerId = data.docId;
  const qr = `https://chart.googleapis.com/chart?chs=280x280&cht=qr&chl=${makerId}`;

  const options = {
    from: 'ssnsycon2022@gmail.com',
    to: `${data.email}`,
    subject: 'SYCon 2k22 - Registration',
    html: renderHtml({ fullName: data.fullName, qr }),
  };
  transporter.sendMail(options, function (error, info) {
    if (error) console.log(error);
    else {
      console.log('Email Sent: ', data.email, info.response);
    }
  });
  return 0;
});
