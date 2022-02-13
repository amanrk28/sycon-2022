const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function generateNumber() {
  return Math.floor(Math.random() * 9001 + 1000);
}
