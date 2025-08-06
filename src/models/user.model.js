const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
    maxLength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address - " + value)
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter Strong Password")
      }
    }
  },
  age: {
    type: Number,
    min: 18
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error('Invalid Gender')
      }
    }
  },
  photoUrl: {
    type: String,
    default: "https://as2.ftcdn.net/jpg/08/19/66/31/1000_F_819663119_che4sZSrmQv8uQJOzuN9TVQFQNHJlfQ2.jpg",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid Photo URL - " + value)
      }
    }
  },
  about: {
    type: String,
    default: "This is default about of the user"
  },
  skills: {
    type: [String]
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
