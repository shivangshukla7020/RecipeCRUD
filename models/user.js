const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  country: String,
  dietaryPreference: {
    type: String,
    enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Non-Vegetarian']
  }
});

userSchema.plugin(passportLocalMongoose); // adds username + password fields

module.exports = mongoose.model('User', userSchema);
