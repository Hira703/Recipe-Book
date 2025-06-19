const express = require('express');
const router = express.Router();
const recipeCtrl = require('../controllers/recipeController');

// ✅ Special Routes (should come first)
router.get('/top/liked', recipeCtrl.getTopLikedRecipes);

// ✅ Bookmark Routes
router.get('/bookmarks/check', recipeCtrl.checkBookmark);   
router.post('/bookmarks', recipeCtrl.bookmarkRecipe);             // Bookmark a recipe
// router.get('/bookmarks/check', recipeCtrl.checkBookmark);         // Check if bookmarked
router.get('/bookmarks', recipeCtrl.getUserBookmarks);           // Get all bookmarks for user
// Add this route to your bookmark routes


// ✅ Main Recipe CRUD Routes
router.get('/', recipeCtrl.getAllRecipes);                       // Get all or filtered by email
router.get('/:id', recipeCtrl.getRecipeById);                    // Get recipe by ID
router.post('/', recipeCtrl.createRecipe);                       // Create new recipe
router.put('/:id', recipeCtrl.updateRecipe);                     // Update recipe by ID
router.patch('/:id/like', recipeCtrl.likeRecipe);                // Like a recipe
router.delete('/:id', recipeCtrl.deleteRecipe);                  // Delete recipe by ID

module.exports = router;
