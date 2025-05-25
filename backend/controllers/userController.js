// controllers/userController.js
const { db } = require('../firebaseAdmin');

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const docRef = await db.collection('users').add(userData);
    res.status(201).json({ id: docRef.id, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
