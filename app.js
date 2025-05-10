const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const User = require('./models/user');

const app = express();

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/recipeApp');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


// Sessions
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Current User & dietaryPreference
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');

app.use('/', userRoutes);
app.use('/recipes', recipeRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
