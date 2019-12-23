const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema;

// Validate Function to check blog title length
let titleLengthChecker = (title) => {
  if (!title) {
    return false; 
  } else {
    if (title.length < 5 || title.length > 50) {
      return false; 
    } else {
      return true;
    }
  }
};

// Validate Function to check if valid title format
let alphaNumericTitleChecker = (title) => {
  
  if (!title) {
    return false; 
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); 
  }
};

// Array of Title Validators
const titleValidators = [
  
  {
    validator: titleLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
  if (!body) {
    return false; 
  } else {
    // Check length of body
    if (body.length < 5 || body.length > 500) {
      return false; 
    } else {
      return true; 
    }
  }
};

// Array of Body validators
const bodyValidators = [
  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false; 
  } else {
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false;
    } else {
      return true; 
    }
  }
};

// Array of Comment validators
const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

// Blog Model Definition
const blogSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String, validate: commentValidators },
    commentator: { type: String }
  }]
});

// Export Module/Schema
module.exports = mongoose.model('Blog', blogSchema);

