const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const { isLoggedIn } = require('../utils/middleware');

// Index
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.render('recipes/index', { recipes });
});

// New
router.get('/new', isLoggedIn, (req, res) => res.render('recipes/new'));

// Create
router.post('/', isLoggedIn, async (req, res) => {
  const { dishName, ingredients, cookingTime, difficulty, instructions } = req.body;
  const recipe = new Recipe({
    dishName,
    ingredients: ingredients.split(',').map(i => i.trim()),
    cookingTime,
    difficulty,
    instructions,
    createdBy: req.user._id
  });
  await recipe.save();
  res.redirect('/recipes');
});

// Show
router.get('/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('createdBy');
  res.render('recipes/show', { recipe });
});

// Edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('recipes/edit', { recipe });
});

// Update (dishName not editable)
router.put('/:id', isLoggedIn, async (req, res) => {
  const { ingredients, cookingTime, difficulty, instructions } = req.body;
  const updated = {
    ingredients: ingredients.split(',').map(i => i.trim()),
    cookingTime,
    difficulty,
    instructions
  };
  await Recipe.findByIdAndUpdate(req.params.id, updated);
  res.redirect(`/recipes/${req.params.id}`);
});

// Delete
router.delete('/:id', isLoggedIn, async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect('/recipes');
});

module.exports = router;
