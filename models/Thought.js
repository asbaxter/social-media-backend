const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
    username: {
        type: String,
        required: "Username is required",
        trim: true
        },
    reactionBody: {    
        type: String,
        required: "some text is required",
        maxlength: 280
      },
    createdAt: {
        type: Date,
        default: Date.now
      },
    },
    {
      toJSON: {
          virtuals: true,
          getters: true
      },
        id: false
  });


const thoughtSchema = new Schema(
    {
    username: {
        type: String,
        required: "Username is required",
        trim: true
        },
      thoughtText: {    
        type: String,
        required: "some text is required",
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      reactions: [ reactionSchema ],
    },
    {
      toJSON: {
          virtuals: true,
          getters: true
      },
        id: false
  });

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;

