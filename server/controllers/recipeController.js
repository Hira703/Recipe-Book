const { ObjectId } = require('mongodb');
const { RecipesCollection, BookmarksCollection } = require('../models');

// GET all recipes or filter by creator email
exports.getAllRecipes = async (req, res) => {
  const email = req.query.email;
  const query = email ? { createdBy: email } : {};

  try {
    const recipes = await RecipesCollection.find(query).toArray();
    res.send(recipes);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch recipes' });
  }
};

// GET recipe by ID
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).send({ error: 'Invalid recipe ID' });

  try {
    const recipe = await RecipesCollection.findOne({ _id: new ObjectId(id) });
    if (!recipe) return res.status(404).send({ error: 'Recipe not found' });
    res.send(recipe);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch recipe' });
  }
};

// POST new recipe
exports.createRecipe = async (req, res) => {
  const newRecipe = req.body;

  try {
    const result = await RecipesCollection.insertOne(newRecipe);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create recipe' });
  }
};

// PUT update recipe by ID
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!ObjectId.isValid(id)) return res.status(400).send({ error: 'Invalid recipe ID' });

  try {
    const result = await RecipesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: 'Recipe not found' });
    }

    res.send({ message: 'Recipe updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update recipe' });
  }
};

// DELETE recipe by ID
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).send({ error: 'Invalid recipe ID' });

  try {
    const result = await RecipesCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.send({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete recipe' });
  }
};

// PATCH: like a recipe
exports.likeRecipe = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).send({ error: 'Invalid recipe ID' });

  try {
    const result = await RecipesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to like recipe' });
  }
};

// GET: top 6 most liked recipes
exports.getTopLikedRecipes = async (req, res) => {
  try {
    const recipes = await RecipesCollection.find()
      .sort({ likes: -1 })
      .limit(6)
      .toArray();

    res.status(200).send(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top liked recipes' });
  }
};

// POST: bookmark a recipe
exports.bookmarkRecipe = async (req, res) => {
  const { recipeId,
    userEmail,
    
    image,
    title,
    ingredients,
    instructions,
    cuisineType,
    preparationTime,
    categories,
    likes,
    createdBy } = req.body;

  if (!recipeId || !userEmail) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const existing = await BookmarksCollection.findOne({ recipeId, userEmail });

    if (existing) {
      return res.status(409).send({ error: 'Recipe already bookmarked' });
      
    }

    const result = await BookmarksCollection.insertOne({
      recipeId,
      userEmail,
    
      image,
      title,
      ingredients,
      instructions,
      cuisineType,
      preparationTime,
      categories,
      likes,
      createdBy,
    });
console.log(result)
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to bookmark recipe' });
  }
};

// GET: check if bookmarked
exports.checkBookmark = async (req, res) => {
  const { user, recipeId } = req.query;

  if (!user || !recipeId) {
    return res.status(400).send({ error: 'Missing query parameters' });
  }

  try {
    const existing = await BookmarksCollection.findOne({ recipeId, userEmail: user });
    res.send({ bookmarked: !!existing });
  } catch (error) {
    res.status(500).send({ error: 'Failed to check bookmark' });
  }
};

// GET: all bookmarks for a user
exports.getUserBookmarks = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  try {
    const bookmarks = await BookmarksCollection.find({ userEmail: email }).toArray();
    res.send(bookmarks);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch bookmarks' });
  }
};
// // DELETE: remove a bookmark
// exports.removeBookmark = async (req, res) => {
//   const { recipeId, userEmail } = req.body;

//   if (!recipeId || !userEmail) {
//     return res.status(400).send({ error: 'Missing required fields' });
//   }

//   try {
//     const result = await BookmarksCollection.deleteOne({ recipeId, userEmail });

//     if (result.deletedCount === 0) {
//       return res.status(404).send({ error: 'Bookmark not found' });
//     }

//     res.send({ message: 'Bookmark removed successfully' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to remove bookmark' });
//   }
// };

