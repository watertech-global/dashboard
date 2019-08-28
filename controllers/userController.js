//  User controller
//   Require mongoose
var mongoose = require( 'mongoose' );
//   account worker customer agent
//  Require models
var User = require('../models/User');
var Customer = require('../models/Customer');
var Worker = require('../models/Worker');
var Agent = require('../models/Agent');

//validator and sanitizor
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

var async = require('async');


// Display list of all user.
exports.user_list = function (req, res, next) {

    User.find()
        .sort([['firstName', 'ascending']])
        .exec(function (err, list_user) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('user_list', { title: 'User List', user_list: list_user });
        })

};
