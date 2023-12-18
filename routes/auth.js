const express = require('express');
const expressValidator = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.put('/signup', [
    expressValidator.body('email')
        .isEmail()
        .withMessage('please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({ email: email }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject('Email addresss already exist')
                }
            })
        }).normalizeEmail(),
        expressValidator.body('password').trim()
        .isLength({ min: 5 }),
        expressValidator.body('name').trim()
        .not()
        .isEmpty()

], authController.signUp)

module.exports = router;