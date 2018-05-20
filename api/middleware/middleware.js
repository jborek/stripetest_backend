const bcrypt = require ('bcrypt');
const User = require('../models/UserModel');

const BCRYPT_COST = 11;

hashPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        throw new Error('No password supplied');
        return;
    }
    bcrypt
        .hash(password, BCRYPT_COST)
        .then((pass) => {
            req.password = pass;
            next();
        })
        .catch((err) => {
            throw new Error(err);
        })
};

const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    if (!username) {
        throw new Error('No username supplied');
        return;
    }
    User.findOne({ username }, (err, user) => {
        if (err || user === null) {
            throw new Error('Unable to find user');
            return;
        }
        const hashedPass = user.password;
        bcrypt
            .compare(password, hashedPass)
            .then((response) => {
                if (!response) throw new Error('No response from bcrypt');
                req.loggedInUser = user;
                next();
            })
            .catch((err) => {
                throw new Error(err);
                return;
            });
    });
};

module.exports = {
    hashPassword,
    authenticate
};