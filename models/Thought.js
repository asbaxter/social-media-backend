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
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    }
);


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
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      reactions: [ reactionSchema ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
