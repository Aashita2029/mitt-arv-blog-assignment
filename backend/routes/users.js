const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Anonymous User',
      bio: userDoc.exists ? userDoc.data().bio : ''
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { displayName, bio } = req.body;
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Update display name in Firebase Auth
    await admin.auth().updateUser(decodedToken.uid, {
      displayName
    });

    // Update bio in Firestore
    await db.collection('users').doc(decodedToken.uid).set({
      bio
    }, { merge: true });

    res.json({ displayName, bio });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user's posts
router.get('/posts', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const postsSnapshot = await db.collection('posts')
      .where('authorId', '==', decodedToken.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const posts = [];
    postsSnapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

module.exports = router; 