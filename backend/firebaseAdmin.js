// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blog-platform-mittarv.firebaseio.com',
});

const db = admin.firestore();

module.exports = { admin, db };
