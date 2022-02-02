const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function generateNumber() {
  return Math.floor(Math.random() * 9001 + 1000);
}

exports.newUserSignup = functions.auth.user().onCreate(user => {
  console.log('User created', user.email);
  return admin.firestore().collections('users').doc(user.uid).set({
    email: user.email,
    referral_code: generateNumber(), // dummy referral code. Unique code will be generated later
  });
});
