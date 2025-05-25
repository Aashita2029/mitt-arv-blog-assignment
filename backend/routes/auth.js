const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Verify Firebase token
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Login with email and password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // Note: Firebase Admin SDK does not have a built-in email/password verification method.
    // You would typically handle this on the client side using Firebase Client SDK, or
    // if you need to do it server-side, you would need a different approach or a separate system.
    // For this example, we'll assume the email exists and generate a custom token.
    // A real-world scenario might involve a more secure server-side password check if not using client SDK for login.

    // Create a custom token for the user
    const customToken = await admin.auth().createCustomToken(uid);

    // Return the custom token to the frontend
    res.json({ token: customToken });

  } catch (error) {
    // Handle specific Firebase errors (e.g., user not found)
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ error: 'User not found' });
    }
    // Handle other errors (e.g., incorrect password - though we are not checking password here)
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Signup with email and password
router.post('/signup', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    // Optionally save additional user info to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      displayName: displayName || '',
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Create a custom token for the newly created user
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(201).json({ uid: userRecord.uid, email: userRecord.email, displayName: userRecord.displayName, token: customToken });

  } catch (error) {
    console.error('Error creating new user:', error);
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create new user' });
  }
});

module.exports = router; 