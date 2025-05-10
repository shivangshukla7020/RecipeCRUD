const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  dishName: { type: String, required: true, unique: true },
  ingredients: [String],
  cookingTime: { type: Number, min: 1 },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  instructions: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Recipe', recipeSchema);
