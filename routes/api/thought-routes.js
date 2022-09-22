const router = require('express').Router();
const { Thought, User } = require("../../models");
const Reaction = require('../../models/Thought');

router.get("/", (req, res) => {
    Thought.find({})
        .populate({
        path: 'reactions',
        select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
});

router.get('/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })
    .populate({
        path: 'reactions',
        select: '-__v'
        })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
    })


router.post('/:userId', ({ params, body }, res) => {
    console.log(body);
    Thought.create(body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
        })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No user thought with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    });

router.put('/:id', ({ params, body }, res) => {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
    })


router.delete('/:id', ({ params }, res) => {
    Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    });


router.put('/:thoughtId/reactions', ({ params, body }, res) => {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    });

router.delete('/:thoughtId/reactions/:reactionId', ({ params }, res) => {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: {_id: params.reactionId}} }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    });



module.exports = router;