const router = require('express').Router();
const { User } = require("../../models");

//Get all Users
router.get("/", (req, res) => {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    });

// Get one User
router.get('/:id', ({ params }, res) => {
    User.findOne({ _id: params.id })
    .then(dbUserData => {
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
    })

// Create a User
router.post('/', ({ body }, res) => {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    });

// Edit a User by id
router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true})
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  })

// Delete a User by id
router.delete('/:id', ({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
              if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    });

router.put('/:userId/friends/', ({ params, body }, res) => {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: body } },
        { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    });

router.delete('/:userId/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: {_id: params.friendId}} }
        )
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    });


module.exports = router;