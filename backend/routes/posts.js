const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Helper function to convert Firebase Timestamp to string
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate().toISOString();
  }
  return null;
};

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postsSnapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts = [];
    postsSnapshot.forEach(doc => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data,
        createdAt: formatTimestamp(data.createdAt),
        updatedAt: formatTimestamp(data.updatedAt)
      });
    });
    res.json(posts);
  } catch (error) {
    console.error('Get Posts API error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const postDoc = await db.collection('posts').doc(req.params.id).get();
    if (!postDoc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const data = postDoc.data();
    res.json({
      id: postDoc.id,
      ...data,
      createdAt: formatTimestamp(data.createdAt),
      updatedAt: formatTimestamp(data.updatedAt)
    });
  } catch (error) {
    console.error('Get Post API error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create post
router.post('/', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await admin.auth().getUser(decodedToken.uid);

    const post = {
      title,
      content,
      tags: tags || [],
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous User',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('posts').add(post);
    const newPostDoc = await docRef.get();
    const newPostData = newPostDoc.data();
    res.status(201).json({
      id: docRef.id,
      ...newPostData,
      createdAt: formatTimestamp(newPostData.createdAt),
      updatedAt: formatTimestamp(newPostData.updatedAt)
    });
  } catch (error) {
    console.error('Create Post API error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const postDoc = await db.collection('posts').doc(req.params.id).get();

    if (!postDoc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (postDoc.data().authorId !== decodedToken.uid) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    const updateData = {
      title,
      content,
      tags: tags || [],
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('posts').doc(req.params.id).update(updateData);

    const updatedPostDoc = await db.collection('posts').doc(req.params.id).get();
    const updatedPostData = updatedPostDoc.data();

    res.json({
      id: req.params.id,
      ...updatedPostData,
      createdAt: formatTimestamp(updatedPostData.createdAt),
      updatedAt: formatTimestamp(updatedPostData.updatedAt)
    });

  } catch (error) {
    console.error('Update Post API error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const postDoc = await db.collection('posts').doc(req.params.id).get();

    if (!postDoc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (postDoc.data().authorId !== decodedToken.uid) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await db.collection('posts').doc(req.params.id).delete();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete Post API error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router; 