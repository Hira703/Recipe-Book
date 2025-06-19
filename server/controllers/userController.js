const { UsersCollection } = require('../models');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UsersCollection.find().toArray();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users' });
  }
};

// Create or update a user
exports.createUser = async (req, res) => {
  const userProfile = req.body;

  if (!userProfile?.email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  try {
    const existingUser = await UsersCollection.findOne({ email: userProfile.email });

    if (existingUser) {
      // User already exists - optionally update profile or just return existing user
      return res.send({ message: 'User already exists', user: existingUser });
    }

    // Insert new user
    const newUser = {
      ...userProfile,
      bookmarks: [],  // initialize empty bookmarks if needed
    };

    const result = await UsersCollection.insertOne(newUser);
    res.send({ message: 'User created successfully', result });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user' });
  }
};

// Get a single user by email (query param)
exports.getUserByEmail = async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  try {
    const user = await UsersCollection.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user' });
  }
};
