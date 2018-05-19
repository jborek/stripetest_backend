const mongoose = require('mongoose');

const User = require('../models/UserModel');

const createUser = (req, res) => {
    const password = req.password;
    const { username } = req.body;
    const newUser = new User({ username, password });
    newUser
        .save()
        .then(createdUser => res.json(createdUser))
        .catch(err => res.status(422).json(err))
};

module.exports = {
    createUser
}