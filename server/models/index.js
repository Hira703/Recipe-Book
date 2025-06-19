const { client } = require('../config/db');

const db = client.db('recipeDB');
const RecipesCollection = db.collection('recipes');
const UsersCollection = db.collection('users');
const BookmarksCollection = db.collection('bookmarks'); 

module.exports = { RecipesCollection, UsersCollection,BookmarksCollection };
