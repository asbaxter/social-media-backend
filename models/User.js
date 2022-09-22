const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: "Username is required",
    trim: true
    },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"],
  },
  thoughts: [],
  friends: []
});

const User = model('User', UserSchema);

module.exports = User;
