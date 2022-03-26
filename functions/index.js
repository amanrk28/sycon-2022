const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const renderHtml = require('./emailTemplate.js');
admin.initializeApp();

const SENDER_EMAIL = 'ssnsycon2022@gmail.com';
const SENDER_PASS = 'Lakshya@$Ycon';

exports.sendRegistrationEmail = functions.firestore
  .document('registrations/{docId}')
  .onUpdate((snap, ctx) => {
    const data = snap.after.data();
    if (!data.email && data.hasPaid !== true && data.emailSent === true) {
      console.log('Email cannot be sent/ Email already sent');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASS,
      },
    });
    const makerId = ctx.params.docId;
    const qr = `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${makerId}`;

    const options = {
      from: 'ssnsycon2022@gmail.com',
      to: `${data.email}`,
      subject: 'Your registration info - TEST',
      html: renderHtml({ fullName: data.fullName, qr }),
    };
    transporter.sendMail(options, function (error, info) {
      if (error) console.log(error);
      else console.log('Email Sent: ', info.response);
    });
  });

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      return {
        message: `Success ${data.email} has been made admin`,
      };
    })
    .catch(err => {
      return err;
    });
});
