const { Schema, model } = require('mongoose');

const friendSchema = new Schema({
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
    },
      {
        toJSON: {
            virtuals: true,
            getters: true
        },
          id: false
})


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
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
  ],
  friends: [ friendSchema ]
},
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
      id: false
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
